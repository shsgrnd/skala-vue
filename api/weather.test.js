import assert from 'node:assert/strict'
import process from 'node:process'
import test from 'node:test'

const weatherModule = await import('./weather.js').catch(() => ({ default: null }))
const handler = weatherModule.default

const runHandler = async (query, fetchImpl) => {
  const originalFetch = globalThis.fetch
  const originalKey = process.env.OPENWEATHER_API_KEY
  globalThis.fetch = fetchImpl
  process.env.OPENWEATHER_API_KEY = 'server-only-key'

  const response = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.body = body
      return this
    },
    setHeader() {},
  }

  try {
    await handler({ method: 'GET', query }, response)
    return response
  } finally {
    globalThis.fetch = originalFetch
    if (originalKey === undefined) delete process.env.OPENWEATHER_API_KEY
    else process.env.OPENWEATHER_API_KEY = originalKey
  }
}

test('좌표 요청은 서버 키로 OpenWeather를 호출하고 원본 날씨 응답을 반환한다', async () => {
  assert.equal(typeof handler, 'function', 'api/weather.js가 서버 핸들러를 내보내야 한다')

  let requestedUrl
  const weather = { id: 1835848, name: 'Seoul', main: { temp: 24 } }
  const response = await runHandler({ lat: '37.5665', lon: '126.978' }, async (url) => {
    requestedUrl = new URL(url)
    return { ok: true, json: async () => weather }
  })

  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.body, weather)
  assert.equal(requestedUrl.searchParams.get('appid'), 'server-only-key')
  assert.equal(requestedUrl.searchParams.get('units'), 'metric')
  assert.equal(JSON.stringify(response.body).includes('server-only-key'), false)
})

test('도시 검색은 서버에서 한국 좌표를 찾은 뒤 날씨 응답을 반환한다', async () => {
  const requestedUrls = []
  const weather = { id: 1841811, name: 'Gwangju', main: { temp: 26 } }
  const response = await runHandler({ q: '광주' }, async (url) => {
    const requestedUrl = new URL(url)
    requestedUrls.push(requestedUrl)
    if (requestedUrl.pathname.includes('/geo/')) {
      return {
        ok: true,
        json: async () => [
          { name: 'Gwangju', country: 'US', lat: 35, lon: -80 },
          { name: 'Gwangju', country: 'KR', lat: 35.1595, lon: 126.8526 },
        ],
      }
    }
    return { ok: true, json: async () => weather }
  })

  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.body, weather)
  assert.equal(requestedUrls.length, 2)
  assert.equal(requestedUrls[1].searchParams.get('lat'), '35.1595')
  assert.equal(requestedUrls[1].searchParams.get('lon'), '126.8526')
})

test('잘못된 좌표와 upstream 오류는 비밀정보 없는 오류만 반환한다', async () => {
  let fetchCount = 0
  const invalid = await runHandler({ lat: '91', lon: '126' }, async () => {
    fetchCount += 1
  })
  assert.equal(invalid.statusCode, 400)
  assert.equal(fetchCount, 0)

  const failed = await runHandler({ lat: '37', lon: '127' }, async () => ({
    ok: false,
    status: 401,
  }))
  assert.equal(failed.statusCode, 401)
  assert.deepEqual(failed.body, { message: '날씨 정보를 가져오지 못했습니다.' })
  assert.equal(JSON.stringify(failed.body).includes('server-only-key'), false)
})

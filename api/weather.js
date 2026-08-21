import process from 'node:process'

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ message: '허용되지 않은 요청입니다.' })
  }

  const rawQuery = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q
  const query = typeof rawQuery === 'string' ? rawQuery.trim() : ''
  let lat = Array.isArray(req.query.lat) ? req.query.lat[0] : req.query.lat
  let lon = Array.isArray(req.query.lon) ? req.query.lon[0] : req.query.lon

  if (!query) {
    const latitude = Number(lat)
    const longitude = Number(lon)
    if (
      lat === undefined ||
      lon === undefined ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({ message: '유효한 lat과 lon이 필요합니다.' })
    }
  } else if (query.length > 100) {
    return res.status(400).json({ message: '도시명이 너무 깁니다.' })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) {
    return res.status(500).json({ message: '서버 설정 오류가 발생했습니다.' })
  }

  try {
    if (query) {
      const geocodingUrl = new URL(GEOCODING_URL)
      geocodingUrl.searchParams.set('q', `${query},KR`)
      geocodingUrl.searchParams.set('limit', '5')
      geocodingUrl.searchParams.set('appid', apiKey)

      const geocodingResponse = await fetch(geocodingUrl)
      if (!geocodingResponse.ok) {
        return res
          .status(geocodingResponse.status || 502)
          .json({ message: '날씨 정보를 가져오지 못했습니다.' })
      }

      const locations = await geocodingResponse.json()
      const location = Array.isArray(locations)
        ? locations.find(({ country }) => country === 'KR')
        : null
      if (!location) {
        return res.status(404).json({ message: '도시를 찾을 수 없습니다.' })
      }
      lat = location.lat
      lon = location.lon
    }

    const weatherUrl = new URL(WEATHER_URL)
    weatherUrl.searchParams.set('lat', String(lat))
    weatherUrl.searchParams.set('lon', String(lon))
    weatherUrl.searchParams.set('appid', apiKey)
    weatherUrl.searchParams.set('units', 'metric')
    weatherUrl.searchParams.set('lang', 'kr')

    const weatherResponse = await fetch(weatherUrl)
    if (!weatherResponse.ok) {
      return res
        .status(weatherResponse.status || 502)
        .json({ message: '날씨 정보를 가져오지 못했습니다.' })
    }

    return res.status(200).json(await weatherResponse.json())
  } catch {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' })
  }
}

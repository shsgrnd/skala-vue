import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHER_URL = import.meta.env.VITE_OPENWEATHER_CURRENT_URL
const GEOCODING_URL = import.meta.env.VITE_OPENWEATHER_GEOCODING_URL

const DEFAULT_CITIES = [
  { name: '서울', lat: 37.5665, lon: 126.978 },
  { name: '부산', lat: 35.1796, lon: 129.0756 },
  { name: '수원', lat: 37.2636, lon: 127.0286 },
  { name: '광주', lat: 35.1595, lon: 126.8526 },
  { name: '대전', lat: 36.3504, lon: 127.3845 },
  { name: '대구', lat: 35.8714, lon: 128.6014 },
]

export const normalizeWeather = (data, displayName = data.name) => ({
  id: String(data.id),
  name: displayName,
  temp: Math.round(data.main.temp),
  feel_temp: Math.round(data.main.feels_like),
  max_temp: Math.round(data.main.temp_max),
  min_temp: Math.round(data.main.temp_min),
  status: data.weather[0]?.description ?? '정보 없음',
  weather_main: data.weather[0]?.main ?? 'Clear',
  humidity: Number(data.main.humidity ?? 0),
  rain: Number(data.rain?.['1h'] ?? 0),
  snow: Number(data.snow?.['1h'] ?? 0),
  wind: Number(data.wind?.speed ?? 0),
  lat: data.coord.lat,
  lon: data.coord.lon,
})

export const upsertCity = (cities, city) => {
  const index = cities.findIndex(({ id }) => id === city.id)
  if (index === -1) cities.push(city)
  else cities.splice(index, 1, city)
}

const requireApiConfig = () => {
  if (!API_KEY) throw new Error('OpenWeather API 키를 .env.local에 설정해주세요.')
  if (!WEATHER_URL || !GEOCODING_URL) {
    throw new Error('OpenWeather API URL을 .env.local에 설정해주세요.')
  }
}

const getErrorMessage = (requestError) => {
  const knownMessages = [
    'OpenWeather API 키를 .env.local에 설정해주세요.',
    'OpenWeather API URL을 .env.local에 설정해주세요.',
  ]
  return knownMessages.includes(requestError.message)
    ? requestError.message
    : '날씨 정보를 가져오지 못했습니다. 잠시 후 다시 시도해주세요.'
}

const requestWeather = async ({ name, lat, lon }) => {
  requireApiConfig()
  const { data } = await axios.get(WEATHER_URL, {
    params: { lat, lon, appid: API_KEY, units: 'metric', lang: 'kr' },
  })
  return normalizeWeather(data, name)
}

export const useWeatherStore = defineStore('weather', () => {
  const cities = ref([])
  const loading = ref(false)
  const error = ref('')
  const defaultsLoaded = ref(false)

  async function fetchDefaultCities() {
    if (defaultsLoaded.value || loading.value) return

    loading.value = true
    error.value = ''
    const results = await Promise.allSettled(DEFAULT_CITIES.map(requestWeather))
    const loadedCities = results
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value)

    loadedCities.forEach((city) => upsertCity(cities.value, city))
    defaultsLoaded.value = loadedCities.length > 0
    if (loadedCities.length < DEFAULT_CITIES.length) {
      error.value = loadedCities.length
        ? '일부 도시의 날씨를 가져오지 못했습니다.'
        : getErrorMessage(results[0]?.reason ?? new Error())
    }
    loading.value = false
  }

  async function fetchCityByCoords(location) {
    loading.value = true
    error.value = ''
    try {
      const city = await requestWeather(location)
      upsertCity(cities.value, city)
      return city
    } catch (requestError) {
      error.value = getErrorMessage(requestError)
      return null
    } finally {
      loading.value = false
    }
  }

  async function searchCity(query) {
    const keyword = query.trim()
    if (!keyword) {
      error.value = '검색할 도시명을 입력해주세요.'
      return null
    }

    loading.value = true
    error.value = ''
    try {
      requireApiConfig()
      const { data } = await axios.get(GEOCODING_URL, {
        params: { q: `${keyword},KR`, limit: 5, appid: API_KEY },
      })
      const location = data.find(({ country }) => country === 'KR')
      if (!location) {
        error.value = `‘${keyword}’ 도시를 찾을 수 없습니다.`
        return null
      }

      const city = await requestWeather({
        name: keyword,
        lat: location.lat,
        lon: location.lon,
      })
      upsertCity(cities.value, city)
      return city
    } catch (requestError) {
      error.value = getErrorMessage(requestError)
      return null
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = ''
  }

  return { cities, loading, error, fetchDefaultCities, fetchCityByCoords, searchCity, clearError }
})

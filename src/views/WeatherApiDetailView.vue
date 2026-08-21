<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const pageError = ref('')
const airQuality = ref(null)
const airQualityLoading = ref(false)
const airQualityError = ref('')

const AIR_QUALITY_URL = import.meta.env.VITE_OPEN_METEO_AIR_QUALITY_URL

const city = computed(() =>
  weatherStore.cities.find(({ id }) => id === String(route.params.cityId)),
)

const convertTemp = (temp) =>
  configStore.unit === 'fahrenheit' ? Math.round((temp * 9) / 5 + 32) : temp

const displayTemps = computed(() => {
  if (!city.value) return null
  return {
    current: convertTemp(city.value.temp),
    feel: convertTemp(city.value.feel_temp),
    max: convertTemp(city.value.max_temp),
    min: convertTemp(city.value.min_temp),
  }
})

const airQualityStatus = computed(() => {
  const aqi = airQuality.value?.us_aqi
  if (aqi === null || aqi === undefined) return ''
  if (aqi <= 50) return '좋음'
  if (aqi <= 100) return '보통'
  if (aqi <= 150) return '민감군 주의'
  if (aqi <= 200) return '나쁨'
  if (aqi <= 300) return '매우 나쁨'
  return '위험'
})

const fetchAirQuality = async ({ lat, lon }) => {
  airQualityLoading.value = true
  airQualityError.value = ''
  try {
    if (!AIR_QUALITY_URL) throw new Error('Open-Meteo API URL이 없습니다.')
    const { data } = await axios.get(AIR_QUALITY_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'pm10,pm2_5,uv_index,us_aqi',
        timezone: 'Asia/Seoul',
      },
    })
    if (!data.current) throw new Error('대기질 데이터가 없습니다.')
    airQuality.value = data.current
  } catch {
    airQualityError.value = '대기질 정보를 가져오지 못했습니다.'
  } finally {
    airQualityLoading.value = false
  }
}

onMounted(async () => {
  let detailCity = city.value

  if (!detailCity) {
    const lat = Number(route.query.lat)
    const lon = Number(route.query.lon)
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      pageError.value = '도시 좌표가 없어 상세 날씨를 불러올 수 없습니다.'
      return
    }

    detailCity = await weatherStore.fetchCityByCoords({
      name: String(route.query.name || '선택 도시'),
      lat,
      lon,
    })
    if (!detailCity) {
      pageError.value = weatherStore.error
      return
    }
  }

  await fetchAirQuality(detailCity)
})
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3>
    <hr />

    <p v-if="weatherStore.loading">상세 날씨를 불러오는 중입니다.</p>
    <div v-else-if="city && displayTemps" class="info-card">
      <h4>📍 지정 지역: {{ city.name }}</h4>
      <p>
        현재 기온: <strong>{{ displayTemps.current }}{{ configStore.unitSymbol }}</strong>
      </p>
      <p>체감 온도: {{ displayTemps.feel }}{{ configStore.unitSymbol }}</p>
      <p>
        최고/최저 기온: {{ displayTemps.max }}{{ configStore.unitSymbol }} / {{ displayTemps.min
        }}{{ configStore.unitSymbol }}
      </p>
      <p>기상 현황: {{ city.status }}</p>
      <p>대기 습도: {{ city.humidity }}%</p>
      <p>현재 풍속: {{ city.wind }}m/s</p>
    </div>
    <p v-else class="error-message" role="alert">
      {{ pageError || weatherStore.error || '해당 지역의 상세 데이터가 없습니다.' }}
    </p>

    <section v-if="city" class="air-quality-card">
      <h4>🌿 현재 대기질</h4>
      <p v-if="airQualityLoading">대기질 정보를 불러오는 중입니다.</p>
      <p v-else-if="airQualityError" class="error-message" role="alert">
        {{ airQualityError }}
      </p>
      <template v-else-if="airQuality">
        <p>
          대기질 지수:
          <strong v-if="airQuality.us_aqi != null">
            {{ Math.round(airQuality.us_aqi) }} · {{ airQualityStatus }}
          </strong>
          <span v-else>정보 없음</span>
        </p>
        <p>미세먼지 PM10: {{ airQuality.pm10 }}μg/m³</p>
        <p>초미세먼지 PM2.5: {{ airQuality.pm2_5 }}μg/m³</p>
        <p>
          자외선 지수:
          {{ airQuality.uv_index == null ? '정보 없음' : airQuality.uv_index.toFixed(1) }}
        </p>
      </template>
      <small>
        대기질 데이터:
        <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>
        · CAMS
      </small>
    </section>

    <button type="button" class="back-btn" @click="router.push('/')">
      ← 메인 대시보드로 돌아가기
    </button>
  </div>
</template>

<style scoped>
.detail-container {
  width: min(1400px, calc(100% - 80px));
  margin: 32px auto 64px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.info-card {
  padding: 15px;
  margin: 15px 0;
  background: #f1f2f6;
  border-radius: 6px;
}

.air-quality-card {
  padding: 15px;
  margin: 15px 0;
  background: #eef7f1;
  border-left: 4px solid #2e8b57;
  border-radius: 6px;
}

.air-quality-card h4 {
  margin-top: 0;
}

.error-message {
  color: #7a1f1f;
}

.back-btn {
  padding: 8px 12px;
  color: #fff;
  cursor: pointer;
  background: #2c3e50;
  border: 0;
  border-radius: 4px;
}

@media (max-width: 639px) {
  .detail-container {
    width: min(100% - 32px, 1400px);
    margin-top: 20px;
  }
}
</style>

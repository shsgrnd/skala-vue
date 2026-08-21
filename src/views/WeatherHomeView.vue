<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import WeatherStatusBar from '@/components/exercise/WeatherStatusBar.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const weatherList = ref([
  { id: 'city_01', name: '서울', max_temp: 34, min_temp: 28, status: '맑음', feel_temp: 36 },
  { id: 'city_02', name: '수원', max_temp: 23, min_temp: 19, status: '비', feel_temp: 20 },
  { id: 'city_03', name: '부산', max_temp: 26, min_temp: 23, status: '구름', feel_temp: 24 },
])

const searchQuery = ref('')
const selectedCityInfo = computed(() => {
  if (!selectedCity.value) return '카드를 클릭하거나 검색해보세요'

  return `${selectedCity.value.name}(${selectedCity.value.feel_temp}°C)이 선택되었습니다.\n 추천: ${clothingRecommendation.value}`
})

const selectedCity = ref(null)

const clothingRecommendation = computed(() => {
  if (!selectedCity.value) return ''

  const { max_temp: max, min_temp: min } = selectedCity.value

  if (max >= 30) return '반팔/나시 + 손선풍기'
  if (max >= 23) {
    return min < 20 ? '반팔/나시 + 얇은 겉옷' : '반팔/나시'
  }
  return '얇은 겉옷'
})

const statusClass = computed(() => {
  const temp = selectedCity.value?.feel_temp

  if (temp === null || temp === undefined) return ''
  if (temp >= 30) return 'hot'
  if (temp >= 23) return 'warm'
  return 'cool'
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((item) => item.name.includes(query))
})

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
})

watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

const handleDetailJump = (cityId) => {
  router.push(`/weather/${cityId}`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>
      <WeatherCard
        v-for="city in filteredWeatherList"
        :key="city.id"
        :city="city"
        @select-card="selectedCity = $event"
        @click-detail="handleDetailJump(city.id)"
      />
      <p v-if="filteredWeatherList.length === 0" class="empty-message">
        😭 <strong>{{ searchQuery }}</strong> 와/과 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>
    <WeatherStatusBar :selected-city-info="selectedCityInfo" :class="statusClass" />
  </div>
</template>

<style scoped></style>

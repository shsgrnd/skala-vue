<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherStatusBar from './WeatherStatusBar.vue'
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
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((item) => item.name.includes(query))
})

watch(selectedCityInfo, (newInfo) => {
  console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`,
  )
})

const showDetail = (city) => {
  selectedCity.value = city

  window.alert(
    `${city.name}의 날씨는 [${city.status}]이며, 최고 ${city.max_temp}°C, 최저 ${city.min_temp}°C입니다.\n코디 추천: ${clothingRecommendation.value}`,
  )
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <WeatherCard
        v-for="city in filteredWeatherList"
        :key="city.id"
        :city="city"
        @select-card="selectedCity = $event"
        @click-detail="showDetail"
      />
      <p v-if="filteredWeatherList.length === 0" class="empty-message">
        😭 <strong>{{ searchQuery }}</strong> 와/과 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <WeatherStatusBar :selected-city-info="selectedCityInfo" />
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}

.empty-message {
  padding: 10px 0;
  color: #e74c3c;
  text-align: center;
}
</style>

<script setup>
import { computed, ref } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCardStore from './WeatherCardStore.vue'
import WeatherDetailStore from './WeatherDetailStore.vue'
import WeatherStatusBar from './WeatherStatusBar.vue'

const configStore = useConfigStore()
const favoritesStore = useFavoritesStore()
const weatherList = ref([
  { id: 'city_01', name: '서울', max_temp: 34, min_temp: 28, status: '맑음', feel_temp: 36 },
  { id: 'city_02', name: '수원', max_temp: 23, min_temp: 19, status: '비', feel_temp: 20 },
  { id: 'city_03', name: '부산', max_temp: 26, min_temp: 23, status: '구름', feel_temp: 24 },
])

const searchQuery = ref('')
const selectedCity = ref(null)
const detailCity = ref(null)

const convertTemp = (temp) =>
  configStore.unit === 'fahrenheit' ? Math.round((temp * 9) / 5 + 32) : temp

const clothingRecommendation = computed(() => {
  if (!selectedCity.value) return ''

  const { max_temp: max, min_temp: min } = selectedCity.value
  if (max >= 30) return '반팔/나시 + 손선풍기'
  if (max >= 23) return min < 20 ? '반팔/나시 + 얇은 겉옷' : '반팔/나시'
  return '얇은 겉옷'
})

const selectedCityInfo = computed(() => {
  if (!selectedCity.value) return '카드를 클릭하거나 검색해보세요'

  return `${selectedCity.value.name}(${convertTemp(selectedCity.value.feel_temp)}${configStore.unitSymbol})이 선택되었습니다.\n 추천: ${clothingRecommendation.value}`
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
  return query
    ? weatherList.value.filter(
        (city) => favoritesStore.isFavorite(city.id) || city.name.includes(query),
      )
    : weatherList.value
})

const hasSearchMatch = computed(() => {
  const query = searchQuery.value.trim()
  return !query || weatherList.value.some((city) => city.name.includes(query))
})
</script>

<template>
  <div class="dashboard-wrapper">
    <WeatherDetailStore v-if="detailCity" :city="detailCity" @back="detailCity = null" />

    <template v-else>
      <BaseDashboardCard>
        <SearchBar :current-query="searchQuery" @update-query="searchQuery = $event" />
      </BaseDashboardCard>

      <BaseDashboardCard>
        <h3>🏙️ 지역별 날씨 현황</h3>
        <p>
          ⭐ 즐겨찾기: <strong>{{ favoritesStore.favoriteCount }}</strong
          >개
        </p>
        <WeatherCardStore
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          @select-card="selectedCity = $event"
          @click-detail="detailCity = $event"
        />
        <p v-if="!hasSearchMatch" class="empty-message">
          😭 <strong>{{ searchQuery }}</strong> 와/과 일치하는 도시가 없습니다.
          <span v-if="favoritesStore.favoriteCount">즐겨찾기 도시만 표시합니다.</span>
        </p>
      </BaseDashboardCard>

      <WeatherStatusBar :selected-city-info="selectedCityInfo" :class="statusClass" />
    </template>
  </div>
</template>

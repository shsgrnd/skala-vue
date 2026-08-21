<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
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
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <!-- input type="text" v-model="searchQuery" placeholder="검색할 도시 이름 입력" / -->
      <input
        type="text"
        :value="searchQuery"
        @input="(e) => (searchQuery = e.target.value)"
        placeholder="검색할 도시 이름 입력"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>
      <p v-if="filteredWeatherList.length === 0">검색 결과와 일치하는 도시가 없습니다.</p>
      <div
        v-for="city in filteredWeatherList"
        :key="city.id"
        class="weather-card"
        @click="selectedCity = city"
      >
        <h4>{{ city.name }} ({{ city.status }})</h4>
        <p>
          체감 온도: {{ city.feel_temp }}°C, 최고/최저 기온: {{ city.max_temp }}°C /
          {{ city.min_temp }}°C
        </p>

        <span v-if="city.feel_temp >= 30" class="badge hot"
          >🔥🔥🔥🔥🔥 찜질방 주의 (30°C 이상)</span
        >
        <span v-else-if="city.feel_temp >= 23" class="badge warm"
          >🔥 더위 조심 (23 ~ 30°C 미만)</span
        >
        <span v-else class="badge cool">❄️ 선선함 (23°C 미만)</span>

        <button class="btn-detail" @click.stop="showDetail(city)">상세보기</button>
      </div>
    </section>
    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped></style>

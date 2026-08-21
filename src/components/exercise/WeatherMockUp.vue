<script setup>
import { ref } from 'vue'
const weatherList = ref([
  { id: 'city_01', name: '서울', max_temp: 34, min_temp: 28, status: '맑음', feel_temp: 36 },
  { id: 'city_02', name: '수원', max_temp: 24, min_temp: 19, status: '비', feel_temp: 20 },
  { id: 'city_03', name: '부산', max_temp: 26, min_temp: 22, status: '구름', feel_temp: 23 },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해보세요')

const showDetail = (cityName, status, max_temp, min_temp) => {
  window.alert(
    `${cityName}의 현재 날씨는 [${status}] 상태이며, 최고 기온은 ${max_temp}°C, 최저기온은 ${min_temp}°C 입니다.`,
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

      <div
        v-for="city in weatherList"
        :key="city.id"
        class="weather-card"
        @click="selectedCityInfo = `${city.name}(${city.feel_temp}°C)이 선택되었습니다.`"
      >
        <h4>{{ city.name }} ({{ city.status }})</h4>
        <p>
          체감 온도: {{ city.feel_temp }}°C, 최고/최저 기온: {{ city.max_temp }} /
          {{ city.min_temp }}
        </p>

        <span v-if="city.feel_temp >= 30" class="badge hot"
          >🔥🔥🔥🔥🔥 찜질방 주의 (30도 이상)</span
        >
        <span v-else-if="city.feel_temp >= 23" class="badge warm"
          >🔥 더위 조심 (23도 이상 30도 미만)</span
        >
        <span v-else class="badge cool">❄️ 선선함 (23도 미만)</span>

        <button
          class="btn-detail"
          @click.stop="showDetail(city.name, city.status, city.max_temp, city.min_temp)"
        >
          상세보기
        </button>
      </div>
    </section>
    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped></style>

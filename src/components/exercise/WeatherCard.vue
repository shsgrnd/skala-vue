<script setup>
defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <div class="weather-card" @click="emit('select-card', city)">
    <h4>{{ city.name }} ({{ city.status }})</h4>
    <p>
      체감 온도: {{ city.feel_temp }}°C, 최고/최저 기온: {{ city.max_temp }}°C /
      {{ city.min_temp }}°C
    </p>

    <span v-if="city.feel_temp >= 30" class="badge hot">🔥🔥🔥🔥🔥 찜질방 주의 (30°C 이상)</span>
    <span v-else-if="city.feel_temp >= 23" class="badge warm">🔥 더위 조심 (23 ~ 30°C 미만)</span>
    <span v-else class="badge cool">❄️ 선선함 (23°C 미만)</span>

    <button class="btn-detail" @click.stop="emit('click-detail', city)">상세보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  color: var(--color-text-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #1d1d1f;
}
.hot {
  background-color: #ff7675;
}
.warm {
  background-color: #fdcb6e;
}
.cool {
  background-color: #74b9ff;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>

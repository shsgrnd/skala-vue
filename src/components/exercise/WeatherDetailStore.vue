<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['back'])
const configStore = useConfigStore()

const displayTemps = computed(() => {
  const convert = (temp) =>
    configStore.unit === 'fahrenheit' ? Math.round((temp * 9) / 5 + 32) : temp

  return {
    feel: convert(props.city.feel_temp),
    max: convert(props.city.max_temp),
    min: convert(props.city.min_temp),
  }
})
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3>
    <hr />

    <div class="info-card">
      <h4>📍 지정 지역: {{ city.name }}</h4>
      <p>기상 현황: {{ city.status }}</p>
      <p>체감 온도: {{ displayTemps.feel }}{{ configStore.unitSymbol }}</p>
      <p>
        최고/최저 기온: {{ displayTemps.max }}{{ configStore.unitSymbol }} / {{ displayTemps.min
        }}{{ configStore.unitSymbol }}
      </p>
    </div>

    <button class="back-btn" @click="emit('back')">← 날씨 목록으로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 20px;
  color: var(--color-text-primary);
  background: var(--color-surface);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.info-card {
  padding: 15px;
  margin: 15px 0;
  background: var(--color-background);
  border-radius: 6px;
}

.back-btn {
  padding: 8px 12px;
  color: #fff;
  cursor: pointer;
  background: #2c3e50;
  border: none;
  border-radius: 4px;
}
</style>

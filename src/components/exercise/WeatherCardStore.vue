<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore'
import { useFavoritesStore } from '@/stores/favoritesStore'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()
const favoritesStore = useFavoritesStore()
const isFavorite = computed(() => favoritesStore.isFavorite(props.city.id))

const displayTemps = computed(() => {
  const convert = (temp) =>
    configStore.unit === 'fahrenheit' ? Math.round((temp * 9) / 5 + 32) : temp

  return {
    feel: convert(props.city.feel_temp),
    max: convert(props.city.max_temp),
    min: convert(props.city.min_temp),
    hot: convert(30),
    warm: convert(23),
  }
})
</script>

<template>
  <div class="weather-card" @click="emit('select-card', city)">
    <h4>
      {{ city.name }} ({{ city.status }})
      <button
        type="button"
        class="favorite-btn"
        :aria-label="isFavorite ? `${city.name} 즐겨찾기 해제` : `${city.name} 즐겨찾기 추가`"
        :aria-pressed="isFavorite"
        @click.stop="favoritesStore.toggleFavorite(city.id)"
      >
        {{ isFavorite ? '★' : '☆' }}
      </button>
    </h4>
    <p>
      체감 온도: {{ displayTemps.feel }}{{ configStore.unitSymbol }}, 최고/최저 기온:
      {{ displayTemps.max }}{{ configStore.unitSymbol }} / {{ displayTemps.min
      }}{{ configStore.unitSymbol }}
    </p>

    <span v-if="city.feel_temp >= 30" class="badge hot">
      🔥🔥🔥🔥🔥 찜질방 주의 ({{ displayTemps.hot }}{{ configStore.unitSymbol }} 이상)
    </span>
    <span v-else-if="city.feel_temp >= 23" class="badge warm">
      🔥 더위 조심 ({{ displayTemps.warm }} ~ {{ displayTemps.hot
      }}{{ configStore.unitSymbol }} 미만)
    </span>
    <span v-else class="badge cool">
      ❄️ 선선함 ({{ displayTemps.warm }}{{ configStore.unitSymbol }} 미만)
    </span>

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

.favorite-btn {
  padding: 0 4px;
  color: #e0a800;
  font-size: 18px;
  cursor: pointer;
  background: transparent;
  border: 0;
}
</style>

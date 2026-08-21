<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { useConfigStore } from '@/stores/configStore'
import { useFavoritesStore } from '@/stores/favoritesStore'

const props = defineProps({
  city: { type: Object, required: true },
  selected: { type: Boolean, default: false },
})

const emit = defineEmits(['select-card', 'click-detail'])
const configStore = useConfigStore()
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => favoritesStore.isFavorite(props.city.id))
const convertTemp = (temp) =>
  configStore.unit === 'fahrenheit' ? Math.round((temp * 9) / 5 + 32) : temp

const displayTemps = computed(() => ({
  current: convertTemp(props.city.temp),
  feel: convertTemp(props.city.feel_temp),
  max: convertTemp(props.city.max_temp),
  min: convertTemp(props.city.min_temp),
}))

const temperatureState = computed(() => {
  if (props.city.feel_temp >= 30) return { label: '매우 더움', severity: 'danger' }
  if (props.city.feel_temp >= 23) return { label: '더위 주의', severity: 'warn' }
  return { label: '선선함', severity: 'info' }
})

const weatherIcon = computed(() => {
  const icons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '🌨️',
    Mist: '🌫️',
    Fog: '🌫️',
  }
  return icons[props.city.weather_main] ?? '🌤️'
})
</script>

<template>
  <Card
    class="final-weather-card"
    :class="{ selected }"
    tabindex="0"
    role="button"
    :aria-label="`${city.name} 날씨 선택`"
    @click="emit('select-card', city)"
    @keydown.enter="emit('select-card', city)"
    @keydown.space.prevent="emit('select-card', city)"
  >
    <template #content>
      <div class="flex items-start gap-4">
        <span class="final-weather-card__icon" aria-hidden="true">{{ weatherIcon }}</span>
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h3>{{ city.name }}</h3>
            <Tag :value="temperatureState.label" :severity="temperatureState.severity" />
          </div>
          <p class="final-weather-card__status">{{ city.status }}</p>
          <div class="final-weather-card__temps mt-3 flex flex-wrap gap-x-4 gap-y-1">
            <strong>{{ displayTemps.current }}{{ configStore.unitSymbol }}</strong>
            <span>체감 {{ displayTemps.feel }}{{ configStore.unitSymbol }}</span>
            <span>
              최고 {{ displayTemps.max }}{{ configStore.unitSymbol }} · 최저
              {{ displayTemps.min }}{{ configStore.unitSymbol }}
            </span>
          </div>
        </div>
        <Button
          text
          rounded
          class="final-weather-card__favorite"
          :aria-label="isFavorite ? `${city.name} 즐겨찾기 해제` : `${city.name} 즐겨찾기 추가`"
          :aria-pressed="isFavorite"
          @click.stop="favoritesStore.toggleFavorite(city.id)"
        >
          <span aria-hidden="true">{{ isFavorite ? '★' : '☆' }}</span>
        </Button>
      </div>

      <div class="final-weather-card__footer mt-4 flex justify-end border-t pt-3">
        <Button
          label="상세 날씨"
          size="small"
          severity="secondary"
          outlined
          @click.stop="emit('click-detail', city)"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.final-weather-card {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  color: var(--site-text);
  background: color-mix(in srgb, var(--site-surface) 90%, transparent);
  border: 1px solid var(--site-border);
  border-radius: 24px;
  box-shadow: 0 8px 30px rgb(0 0 0 / 0.04);
  cursor: pointer;
  transition:
    color 0.35s ease,
    background-color 0.35s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.final-weather-card:hover,
.final-weather-card:focus-visible {
  border-color: color-mix(in srgb, var(--site-text) 14%, var(--site-border));
  box-shadow: 0 16px 38px rgb(0 0 0 / 0.08);
  outline: none;
  transform: translateY(-4px);
}

.final-weather-card.selected {
  background: color-mix(in srgb, var(--site-red) 4%, var(--site-surface));
  border-color: color-mix(in srgb, var(--site-red) 22%, var(--site-border));
}

.final-weather-card.selected::before {
  position: absolute;
  top: 22px;
  bottom: 22px;
  left: 0;
  width: 3px;
  background: var(--site-red);
  border-radius: 0 999px 999px 0;
  content: '';
}

.final-weather-card__icon {
  display: grid;
  flex: 0 0 46px;
  width: 46px;
  height: 46px;
  place-items: center;
  font-size: 1.7rem;
  background: var(--site-surface-secondary);
  border-radius: 8px;
}

.final-weather-card h3 {
  margin: 0;
  color: var(--site-text);
  font-size: 1rem;
  line-height: 1.3;
}

.final-weather-card__status {
  margin: 3px 0 0;
  color: var(--site-text-muted);
  font-size: 0.86rem;
}

.final-weather-card__temps {
  color: var(--site-text-muted);
  font-size: 0.83rem;
}

.final-weather-card__temps strong {
  color: var(--site-text);
  font-size: 1rem;
}

.final-weather-card__favorite {
  width: 2.25rem;
  height: 2.25rem;
  color: var(--site-orange) !important;
}

.final-weather-card__footer {
  border-color: var(--site-border);
}

:deep(.p-card-body),
:deep(.p-card-content) {
  min-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  .final-weather-card {
    transition: none;
  }

  .final-weather-card:hover,
  .final-weather-card:focus-visible {
    transform: none;
  }
}
</style>

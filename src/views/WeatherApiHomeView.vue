<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import InterviewOutfitPanel from '@/components/exercise/InterviewOutfitPanel.vue'
import FinalWeatherCard from '@/components/site/FinalWeatherCard.vue'
import { useConfigStore } from '@/stores/configStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useWeatherStore } from '@/stores/weatherStore'
import { buildOutfitRecommendation } from '@/utils/outfitRecommendation'

const router = useRouter()
const configStore = useConfigStore()
const favoritesStore = useFavoritesStore()
const weatherStore = useWeatherStore()
const pageRoot = ref(null)
const searchQuery = ref('')
const selectedCity = ref(null)
let revealObserver

const genderOptions = [
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
]

const convertTemp = (temp) =>
  configStore.unit === 'fahrenheit' ? Math.round((temp * 9) / 5 + 32) : temp

const visibleCities = computed(() => {
  const query = searchQuery.value.trim()
  return query
    ? weatherStore.cities.filter(
        (city) => favoritesStore.isFavorite(city.id) || city.name.includes(query),
      )
    : weatherStore.cities
})

const outfitRecommendation = computed(() =>
  selectedCity.value ? buildOutfitRecommendation(selectedCity.value, configStore.gender) : null,
)

const precipitationInfo = computed(() => {
  if (!selectedCity.value) return ''
  if (selectedCity.value.snow > 0) return `눈 ${selectedCity.value.snow}mm/h`
  if (selectedCity.value.rain > 0) return `비 ${selectedCity.value.rain}mm/h`
  return '없음'
})

const search = async () => {
  const city = await weatherStore.searchCity(searchQuery.value)
  if (city) selectedCity.value = city
}

const openDetail = (city) => {
  router.push({
    name: 'WeatherDetail',
    params: { cityId: city.id },
    query: { lat: city.lat, lon: city.lon, name: city.name },
  })
}

const revealSections = () => {
  const elements = pageRoot.value?.querySelectorAll('.weather-reveal') ?? []
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.12 },
  )

  elements.forEach((element) => revealObserver.observe(element))
}

onMounted(async () => {
  revealSections()
  await weatherStore.fetchDefaultCities()
  selectedCity.value =
    weatherStore.cities.find(({ name }) => name === '서울') ?? weatherStore.cities[0] ?? null
})

onBeforeUnmount(() => revealObserver?.disconnect())
</script>

<template>
  <main ref="pageRoot" class="outfit-page">
    <header class="outfit-hero">
      <p class="outfit-hero__eyebrow">Never Under Dressed</p>
      <h1>
        <span>오늘 날씨에 맞는 면접 복장</span>
      </h1>
      <p class="outfit-hero__slogan">Dress the Part. Own the Room.</p>
      <p class="outfit-hero__description">
        대한민국 도시의 실시간 날씨를 확인하고,<br class="hidden sm:block" />
        이동부터 면접까지 단정한 복장을 준비하세요.
      </p>
    </header>

    <section class="outfit-search-section weather-reveal" aria-labelledby="city-search-title">
      <div>
        <p class="outfit-kicker">City Search</p>
        <h2 id="city-search-title">대한민국 도시 검색</h2>
        <p class="outfit-section-description">
          도시 이름을 입력해 실시간 날씨를 추가로 확인하세요.
        </p>
      </div>
      <form class="outfit-search" @submit.prevent="search">
        <InputText
          v-model="searchQuery"
          type="search"
          class="w-full min-w-0 flex-1"
          placeholder="예: 전주, 제주, 춘천"
          aria-label="검색할 대한민국 도시명"
          @input="weatherStore.clearError"
        />
        <Button
          type="submit"
          label="검색"
          class="outfit-primary-button"
          :loading="weatherStore.loading"
        />
      </form>
    </section>

    <section class="outfit-weather-content weather-reveal" aria-label="날씨와 면접 복장 정보">
      <div class="outfit-weather-grid">
        <section class="outfit-list-section min-w-0" aria-labelledby="weather-list-title">
          <div class="outfit-section-heading flex flex-wrap items-end justify-between gap-3">
            <div>
              <p class="outfit-kicker">Live Weather</p>
              <h2 id="weather-list-title">지역별 실시간 날씨</h2>
            </div>
            <p>
              즐겨찾기 <strong>{{ favoritesStore.favoriteCount }}</strong
              >개
            </p>
          </div>

          <Message v-if="weatherStore.error" severity="error" :closable="false" class="mt-5">
            {{ weatherStore.error }}
          </Message>

          <div
            v-if="weatherStore.loading && !weatherStore.cities.length"
            class="outfit-loading mt-5 flex items-center justify-center gap-3 py-12"
          >
            <ProgressSpinner class="h-8 w-8" stroke-width="5" />
            <span>기본 도시의 날씨를 불러오는 중입니다.</span>
          </div>

          <div v-else class="outfit-card-list mt-6 grid gap-4">
            <FinalWeatherCard
              v-for="city in visibleCities"
              :key="city.id"
              :city="city"
              :selected="selectedCity?.id === city.id"
              @select-card="selectedCity = $event"
              @click-detail="openDetail"
            />
          </div>

          <Message
            v-if="!weatherStore.loading && !visibleCities.length && !weatherStore.error"
            severity="secondary"
            :closable="false"
            class="mt-5"
          >
            검색 버튼을 눌러 해당 도시의 날씨를 조회해보세요.
            <span v-if="favoritesStore.favoriteCount">즐겨찾기 도시는 계속 표시됩니다.</span>
          </Message>
        </section>

        <aside class="outfit-detail-column lg:sticky lg:top-24 lg:self-start">
          <Transition name="city-content" mode="out-in">
            <Card
              :key="selectedCity?.id ?? 'empty-weather'"
              class="outfit-surface current-weather-card"
            >
              <template #content>
                <div class="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p class="outfit-kicker">Current Weather</p>
                    <h2>{{ selectedCity ? `${selectedCity.name} 현재 날씨` : '현재 날씨' }}</h2>
                  </div>
                  <Button
                    :label="configStore.unit === 'celsius' ? '℃ 섭씨' : '℉ 화씨'"
                    size="small"
                    severity="secondary"
                    outlined
                    @click="configStore.toggleUnit"
                  />
                </div>

                <div v-if="selectedCity" class="current-weather-card__body mt-8">
                  <div class="current-weather-card__temperature">
                    {{ convertTemp(selectedCity.temp) }}<small>{{ configStore.unitSymbol }}</small>
                  </div>
                  <p>{{ selectedCity.status }}</p>
                  <dl class="mt-8 grid grid-cols-2 gap-x-5 gap-y-5">
                    <div>
                      <dt>체감온도</dt>
                      <dd>{{ convertTemp(selectedCity.feel_temp) }}{{ configStore.unitSymbol }}</dd>
                    </div>
                    <div>
                      <dt>습도</dt>
                      <dd>{{ selectedCity.humidity }}%</dd>
                    </div>
                    <div>
                      <dt>강수</dt>
                      <dd>{{ precipitationInfo }}</dd>
                    </div>
                    <div>
                      <dt>풍속</dt>
                      <dd>{{ selectedCity.wind }}m/s</dd>
                    </div>
                  </dl>
                </div>
                <p v-else class="outfit-empty mt-8">날씨 카드를 선택해주세요.</p>
              </template>
            </Card>
          </Transition>

          <section class="outfit-gender-control" aria-labelledby="gender-control-title">
            <div>
              <p class="outfit-kicker">Preference</p>
              <h2 id="gender-control-title">추천 복장 기준</h2>
            </div>
            <div
              class="gender-segmented"
              :class="{ 'is-female': configStore.gender === 'female' }"
              role="group"
              aria-label="면접 복장 성별 선택"
            >
              <span class="gender-segmented__indicator" aria-hidden="true"></span>
              <button
                v-for="option in genderOptions"
                :key="option.value"
                type="button"
                class="gender-segmented__option"
                :class="{ selected: configStore.gender === option.value }"
                :aria-pressed="configStore.gender === option.value"
                @click="configStore.setGender(option.value)"
              >
                {{ option.label }}
              </button>
            </div>
          </section>

          <Transition name="city-content" mode="out-in">
            <InterviewOutfitPanel
              :key="selectedCity?.id ?? 'empty-outfit'"
              :city="selectedCity"
              :recommendation="outfitRecommendation"
            />
          </Transition>
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>
.outfit-page {
  width: min(1400px, calc(100% - 80px));
  margin: 0 auto;
  padding: 82px 0 120px;
}

.outfit-hero {
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
}

.outfit-hero__eyebrow {
  margin: 0 0 22px;
  color: var(--site-text-muted);
  font-size: 0.82rem;
  font-weight: 750;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  animation: hero-enter 0.6s both;
}

.outfit-hero h1 {
  display: block;
  margin: 0;
  color: var(--site-text);
  font-size: clamp(3rem, 6vw, 4.75rem);
  font-weight: 750;
  line-height: 1.04;
  letter-spacing: -0.052em;
  animation: hero-enter 0.65s 0.1s both;
}

.outfit-hero h1::before {
  display: none;
}

.outfit-hero h1 span {
  display: block;
}

.outfit-hero__description {
  max-width: 680px;
  margin: 28px auto 0;
  color: var(--site-text-muted);
  font-size: 1.125rem;
  line-height: 1.65;
  animation: hero-enter 0.65s 0.28s both;
}

.outfit-hero__slogan {
  margin: 24px 0 0;
  color: var(--site-text);
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  animation: hero-enter 0.65s 0.18s both;
}

.outfit-hero__slogan + .outfit-hero__description {
  margin-top: 14px;
}

.outfit-search-section {
  display: grid;
  grid-template-columns: minmax(220px, 0.65fr) minmax(0, 1.35fr);
  align-items: end;
  gap: 64px;
  max-width: 980px;
  margin: 112px auto 0;
  padding: 48px 0;
  border-block: 1px solid var(--site-border);
}

.outfit-search {
  display: flex;
  gap: 12px;
  min-width: 0;
}

.outfit-search :deep(.p-inputtext) {
  min-height: 54px;
  padding-inline: 18px;
  color: var(--site-text);
  background: var(--site-surface);
  border-color: var(--site-border);
  border-radius: 14px;
  box-shadow: none;
}

.outfit-search :deep(.p-inputtext:focus) {
  border-color: color-mix(in srgb, var(--site-red) 60%, var(--site-border));
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--site-red) 10%, transparent);
}

.outfit-weather-content {
  max-width: 1280px;
  margin: 112px auto 0;
}

.outfit-weather-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
  gap: clamp(40px, 6vw, 88px);
  align-items: start;
}

.outfit-detail-column {
  display: grid;
  gap: 28px;
}

.outfit-hero__description,
.outfit-section-description,
.outfit-section-heading > p,
.outfit-loading,
.outfit-empty {
  color: var(--site-text-muted);
}

.outfit-section-description {
  margin: 8px 0 0;
  font-size: 0.9rem;
}

.outfit-surface {
  width: 100%;
  min-width: 0;
  color: var(--site-text);
  background: var(--site-surface);
  border: 1px solid var(--site-border);
  border-radius: 24px;
  box-shadow: 0 12px 36px rgb(0 0 0 / 0.045);
  transition:
    color 0.35s ease,
    background-color 0.35s ease,
    border-color 0.35s ease;
}

.outfit-kicker {
  margin: 0 0 3px;
  color: var(--site-text-muted);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.outfit-search-section h2,
.outfit-search h2,
.outfit-section-heading h2,
.current-weather-card h2,
.outfit-gender-control h2 {
  margin: 0;
  padding: 0;
  color: var(--site-text);
  border: 0;
  font-size: 1.15rem;
  line-height: 1.35;
}
.outfit-primary-button {
  min-width: 104px;
  background: var(--site-red) !important;
  border-color: var(--site-red) !important;
  border-radius: 999px !important;
}

.outfit-primary-button:hover {
  background: color-mix(in srgb, var(--site-red) 88%, black) !important;
  border-color: color-mix(in srgb, var(--site-red) 88%, black) !important;
}

.outfit-section-heading {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--site-border);
}

.current-weather-card__temperature {
  color: var(--site-text);
  font-size: clamp(4rem, 8vw, 6.25rem);
  font-weight: 750;
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.current-weather-card__temperature small {
  margin-left: 4px;
  color: var(--site-text-muted);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0;
}

.current-weather-card__body > p {
  margin-top: 8px;
  color: var(--site-text-muted);
}
.current-weather-card dt {
  color: var(--site-text-muted);
  font-size: 0.76rem;
}
.current-weather-card dd {
  margin: 2px 0 0;
  color: var(--site-text);
  font-weight: 700;
}

.outfit-gender-control {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 4px;
}

.gender-segmented {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 196px;
  padding: 4px;
  overflow: hidden;
  background: var(--site-surface-secondary);
  border: 1px solid var(--site-border);
  border-radius: 999px;
}

.gender-segmented__indicator {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  background: var(--site-red);
  border-radius: 999px;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--site-red) 22%, transparent);
  transition: transform 0.24s ease;
}

.gender-segmented.is-female .gender-segmented__indicator {
  transform: translateX(100%);
}

.gender-segmented__option {
  position: relative;
  z-index: 1;
  min-height: 38px;
  padding: 7px 16px;
  color: var(--site-text);
  font-size: 0.86rem;
  font-weight: 700;
  background: transparent;
  border: 0;
  border-radius: 999px;
  box-shadow: none;
  transition: color 0.2s ease;
}

.gender-segmented__option:hover,
.gender-segmented__option:active {
  background: transparent;
  border: 0;
  box-shadow: none;
  transform: none;
}

.gender-segmented__option.selected {
  color: #fff;
}

.gender-segmented__option:focus-visible {
  outline: 2px solid var(--site-red);
  outline-offset: -2px;
}

.weather-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.65s ease,
    transform 0.65s ease;
}

.weather-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.city-content-enter-active,
.city-content-leave-active {
  transition:
    opacity 0.24s ease,
    transform 0.24s ease;
}

.city-content-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.city-content-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@keyframes hero-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1023px) {
  .outfit-weather-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 639px) {
  .outfit-page {
    width: min(100% - 32px, 1400px);
    padding: 56px 0 80px;
  }

  .outfit-hero h1 {
    font-size: clamp(2.65rem, 13vw, 4rem);
  }

  .outfit-hero__description {
    margin-top: 22px;
    font-size: 1rem;
  }

  .outfit-search-section {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
    margin-top: 80px;
    padding: 36px 0;
  }

  .outfit-search {
    flex-direction: column;
  }

  .outfit-search :deep(.p-button) {
    width: 100%;
  }

  .outfit-weather-content {
    margin-top: 80px;
  }

  .outfit-weather-grid {
    gap: 64px;
  }

  .outfit-gender-control {
    align-items: stretch;
  }

  .gender-segmented {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .outfit-hero__eyebrow,
  .outfit-hero h1,
  .outfit-hero__slogan,
  .outfit-hero__description {
    animation: none;
  }

  .weather-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .outfit-surface,
  .gender-segmented__indicator,
  .gender-segmented__option,
  .city-content-enter-active,
  .city-content-leave-active {
    transition: none;
  }
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'
import { useConfigStore } from './stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="app-container final-weather-app" :class="{ dark: configStore.theme === 'dark' }">
    <div class="preference-bar">
      <div class="gender-control" role="group" aria-label="면접 복장 성별 선택">
        <button
          type="button"
          class="gender-button"
          :class="{ active: configStore.gender === 'male' }"
          :aria-pressed="configStore.gender === 'male'"
          @click="configStore.setGender('male')"
        >
          남성
        </button>
        <button
          type="button"
          class="gender-button"
          :class="{ active: configStore.gender === 'female' }"
          :aria-pressed="configStore.gender === 'female'"
          @click="configStore.setGender('female')"
        >
          여성
        </button>
      </div>
      <button
        type="button"
        class="theme-button"
        :aria-label="configStore.theme === 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'"
        @click="configStore.toggleTheme"
      >
        {{ configStore.theme === 'light' ? '🌙' : '☀️' }}
      </button>
    </div>
    <h1>⛅ 최종 누적 Weather App</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar" aria-label="주요 메뉴">
        <RouterLink to="/" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/guide" class="nav-item">👕 옷차림 가이드</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
@import './assets/exercise.css';

.final-weather-app {
  max-width: 1280px;
}

.final-weather-app > .dashboard-wrapper {
  width: min(100%, 960px);
}

.preference-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.gender-control {
  display: inline-flex;
}

.gender-button {
  min-height: 34px;
  color: var(--color-text-secondary);
  background: var(--color-surface);
  border-color: var(--color-border);
  border-radius: 0;
}

.gender-button:first-child {
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}

.gender-button:last-child {
  margin-left: -1px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.gender-button.active,
.gender-button.active:hover {
  color: #fff;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.gender-button:not(.active):hover {
  color: var(--color-primary);
  background: var(--color-primary-soft);
  border-color: var(--color-border);
}

.theme-button {
  min-width: 42px;
  padding: 6px 10px;
}

.final-weather-app.dark {
  --color-background: #20242a;
  --color-surface: #2b3038;
  --color-text-primary: #f1f3f5;
  --color-text-secondary: #c5cbd3;
  --color-text-disabled: #7f8792;
  --color-border: #454c56;
  --color-primary-soft: rgba(234, 0, 44, 0.18);
  --color-secondary-soft: rgba(244, 119, 37, 0.2);
  --shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 6px 16px rgba(0, 0, 0, 0.36);
}

.final-weather-app.dark .base-dashboard-card,
.final-weather-app.dark .detail-container,
.final-weather-app.dark .guide-container,
.final-weather-app.dark .description-box {
  color: var(--color-text-primary);
  background: var(--color-background);
  border-color: var(--color-border);
}

.final-weather-app.dark .weather-card,
.final-weather-app.dark .info-card,
.final-weather-app.dark .air-quality-card,
.final-weather-app.dark .not-found-content {
  color: var(--color-text-primary);
  background: var(--color-surface);
  border-color: var(--color-border);
}

.final-weather-app.dark .description-box li,
.final-weather-app.dark .not-found-content h2,
.final-weather-app.dark .not-found-content p,
.final-weather-app.dark .notice {
  color: var(--color-text-secondary);
}

.final-weather-app.dark .not-found-container {
  background: var(--color-background);
}

.final-weather-app.dark .error-message {
  color: #ffb3b3;
  background: rgba(234, 0, 44, 0.14);
}

@media (max-width: 520px) {
  .preference-bar {
    align-items: stretch;
  }
}
</style>

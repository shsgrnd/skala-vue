<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import WeatherComposition from './components/exercise/WeatherComposition.vue'
import WeatherMockUp from './components/exercise/WeatherMockUp.vue'
import WeatherParent from './components/exercise/WeatherParent.vue'
import UnitToggler from './components/exercise/UnitToggler.vue'
import WeatherStoreDashboard from './components/exercise/WeatherStoreDashboard.vue'

const storePage = ref('dashboard')
const WeatherAboutView = defineAsyncComponent(() => import('./views/WeatherAboutView.vue'))
const WeatherGuideView = defineAsyncComponent(() => import('./views/WeatherGuideView.vue'))
</script>

<template>
  <div class="app-container">
    <h1>⛅ 과제 1: 날씨 (Mockup)</h1>
    <hr />
    <WeatherMockUp />
  </div>
  <div class="app-container">
    <h1>⛅ 과제 2: 날씨 (컴포지션)</h1>
    <hr />
    <WeatherComposition />
  </div>
  <div class="app-container">
    <h1>⛅ 과제 3: 날씨 (컴포넌트)</h1>
    <hr />
    <WeatherParent />
  </div>
  <div class="app-container">
    <h1>⛅ 과제 4: 라우터적용</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/guide" class="nav-item">👕 옷차림 가이드</RouterLink>
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
  <div class="app-container">
    <h1>⛅ 과제 5: 스토어적용</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <button
          type="button"
          class="nav-item store-nav-item"
          :class="{ active: storePage === 'dashboard' }"
          @click="storePage = 'dashboard'"
        >
          🌦️ 날씨 대시보드
        </button>
        <span class="divider">|</span>
        <button
          type="button"
          class="nav-item store-nav-item"
          :class="{ active: storePage === 'about' }"
          @click="storePage = 'about'"
        >
          ℹ️ 서비스 소개
        </button>
        <span class="divider">|</span>
        <button
          type="button"
          class="nav-item store-nav-item"
          :class="{ active: storePage === 'guide' }"
          @click="storePage = 'guide'"
        >
          👕 옷차림 가이드
        </button>
        <UnitToggler />
      </nav>
      <main>
        <WeatherStoreDashboard v-if="storePage === 'dashboard'" />
        <WeatherAboutView v-else-if="storePage === 'about'" :show-home="false" />
        <WeatherGuideView v-else :show-home="false" />
      </main>
    </div>
  </div>
</template>

<style>
@import './assets/exercise.css';

.store-nav-item {
  font-family: inherit;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.store-nav-item.active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}
</style>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const configStore = useConfigStore()
const scrolled = ref(false)

const updateScrolled = () => {
  scrolled.value = window.scrollY > 12
}

const navItems = [
  { label: '면접 복장 추천', to: '/', section: 'outfit' },
  { label: '실습 기록', to: '/practice/day1', section: 'practice' },
  { label: '이전 과제', to: '/assignments/1', section: 'assignments' },
  { label: 'Troubleshooting', to: '/troubleshooting/1', section: 'troubleshooting' },
]

onMounted(() => {
  updateScrolled()
  window.addEventListener('scroll', updateScrolled, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScrolled))
</script>

<template>
  <header class="site-navbar sticky top-0 z-50" :class="{ scrolled }">
    <div class="site-navbar__inner h-14 w-full px-4 lg:px-6">
      <RouterLink class="site-navbar__brand" to="/">Never Under Dressed</RouterLink>

      <nav class="site-navbar__links flex min-w-0 flex-1 items-stretch overflow-x-auto" aria-label="주요 메뉴">
        <RouterLink
          v-for="item in navItems"
          :key="item.section"
          :to="item.to"
          class="site-navbar__link flex shrink-0 items-center px-3"
          :class="{ active: route.meta.section === item.section }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <Button
        text
        rounded
        class="site-navbar__theme shrink-0"
        :aria-label="configStore.theme === 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'"
        @click="configStore.toggleTheme"
      >
        <span aria-hidden="true">{{ configStore.theme === 'light' ? '🌙' : '☀️' }}</span>
      </Button>
    </div>
  </header>
</template>

<style scoped>
.site-navbar {
  background: color-mix(in srgb, var(--site-background) 20%, transparent);
  border-bottom: 1px solid transparent;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    backdrop-filter 0.3s ease;
}

.site-navbar.scrolled {
  background: color-mix(in srgb, var(--site-surface) 76%, transparent);
  border-color: color-mix(in srgb, var(--site-text) 8%, transparent);
  box-shadow: 0 1px 12px rgb(0 0 0 / 0.035);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.site-navbar__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: stretch;
  gap: 16px;
}

.site-navbar__brand {
  align-self: center;
  justify-self: start;
  overflow: hidden;
  color: var(--site-text);
  font-size: 0.84rem;
  font-weight: 750;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.site-navbar__brand:hover {
  color: var(--site-text);
  text-decoration: none;
}

.site-navbar__links {
  justify-content: center;
  scrollbar-width: none;
}

.site-navbar__links::-webkit-scrollbar {
  display: none;
}

.site-navbar__link {
  position: relative;
  color: var(--site-text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.site-navbar__link:hover,
.site-navbar__link.active {
  color: var(--site-red);
  text-decoration: none;
}

.site-navbar__link.active::after {
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  height: 2px;
  background: var(--site-red);
  content: '';
}

.site-navbar__theme {
  align-self: center;
  justify-self: end;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--site-text) !important;
}

@media (max-width: 640px) {
  .site-navbar__inner {
    grid-template-columns: minmax(0, 1fr) 2.5rem;
    gap: 6px;
    overflow: hidden;
  }

  .site-navbar__brand {
    display: none;
  }

  .site-navbar__link {
    padding-inline: 10px;
    font-size: 0.82rem;
  }

  .site-navbar__links {
    justify-content: flex-start;
  }

  .site-navbar__theme {
    flex: 0 0 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-navbar {
    transition: none;
  }
}
</style>

<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/site/AppNavbar.vue'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

const stopThemeWatch = watch(
  () => configStore.theme,
  (theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  },
  { immediate: true },
)

onBeforeUnmount(stopThemeWatch)
</script>

<template>
  <div class="site-shell min-h-screen bg-[var(--site-background)] text-[var(--site-text)]">
    <AppNavbar />
    <RouterView />
  </div>
</template>

<style scoped>
.site-shell {
  transition:
    color 0.35s ease,
    background-color 0.35s ease;
}

@media (prefers-reduced-motion: reduce) {
  .site-shell {
    transition: none;
  }
}
</style>

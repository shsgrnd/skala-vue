<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import DocumentationLayout from '@/components/site/DocumentationLayout.vue'

const route = useRoute()

const days = [
  { id: 'day1', label: 'Day 1' },
  { id: 'day2', label: 'Day 2' },
  { id: 'day3', label: 'Day 3' },
]

const dayComponents = {
  day1: defineAsyncComponent(() => import('@/App_1st.vue')),
  day2: defineAsyncComponent(() => import('@/App_2nd.vue')),
  day3: defineAsyncComponent(() => import('@/App_3rd.vue')),
}

const currentDay = computed(() => String(route.params.day || 'day1'))
const currentComponent = computed(() => dayComponents[currentDay.value] ?? dayComponents.day1)
</script>

<template>
  <DocumentationLayout
    eyebrow="Practice Archive"
    title="실습 기록"
    description="Vue 기본 문법부터 상태 관리와 외부 라이브러리까지 Day별 학습 결과를 확인합니다."
  >
    <template #sidebar>
      <p class="docs-sidebar__title">실습 기록</p>
      <nav class="docs-sidebar__nav" aria-label="Day 선택">
        <RouterLink
          v-for="day in days"
          :key="day.id"
          :to="`/practice/${day.id}`"
          class="docs-sidebar__link"
        >
          {{ day.label }}
        </RouterLink>
      </nav>
    </template>

    <component :is="currentComponent" />
  </DocumentationLayout>
</template>

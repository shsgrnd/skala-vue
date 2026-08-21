<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import DocumentationLayout from '@/components/site/DocumentationLayout.vue'

const route = useRoute()

const assignments = [
  { id: '1', label: '과제 01', title: 'Weather Mockup' },
  { id: '2', label: '과제 02', title: 'Weather Composition' },
  { id: '3', label: '과제 03', title: 'Weather Component' },
  { id: '4', label: '과제 04', title: 'Weather Router' },
  { id: '5', label: '과제 05', title: 'Weather Store' },
]

const assignmentComponents = {
  1: defineAsyncComponent(() => import('@/components/exercise/WeatherMockUp.vue')),
  2: defineAsyncComponent(() => import('@/components/exercise/WeatherComposition.vue')),
  3: defineAsyncComponent(() => import('@/components/exercise/WeatherParent.vue')),
  4: defineAsyncComponent(() => import('@/views/WeatherHomeView.vue')),
  5: defineAsyncComponent(() => import('@/components/exercise/WeatherStoreDashboard.vue')),
}

const currentId = computed(() => String(route.params.id || '1'))
const currentAssignment = computed(
  () => assignments.find(({ id }) => id === currentId.value) ?? assignments[0],
)
const currentComponent = computed(
  () => assignmentComponents[currentId.value] ?? assignmentComponents[1],
)
</script>

<template>
  <DocumentationLayout
    eyebrow="Assignment Archive"
    title="이전 과제"
    :description="`${currentAssignment.label} · ${currentAssignment.title}`"
  >
    <template #sidebar>
      <p class="docs-sidebar__title">이전 과제</p>
      <nav class="docs-sidebar__nav" aria-label="과제 선택">
        <RouterLink
          v-for="assignment in assignments"
          :key="assignment.id"
          :to="`/assignments/${assignment.id}`"
          class="docs-sidebar__link"
        >
          {{ assignment.label }} . {{ assignment.title }}
        </RouterLink>
      </nav>
    </template>

    <div class="legacy-assignment">
      <component :is="currentComponent" />
    </div>
  </DocumentationLayout>
</template>

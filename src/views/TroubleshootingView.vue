<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Tag from 'primevue/tag'
import DocumentationLayout from '@/components/site/DocumentationLayout.vue'
import { troubleshootingItems } from '@/data/troubleshooting'

const route = useRoute()

const currentItem = computed(
  () =>
    troubleshootingItems.find(({ id }) => id === String(route.params.id)) ??
    troubleshootingItems[0],
)

const sections = computed(() => [
  { label: 'Problem', content: currentItem.value.problem },
  { label: 'Error', content: currentItem.value.error },
  { label: 'Cause', content: currentItem.value.cause },
  { label: 'Solution', content: currentItem.value.solution },
  { label: 'Result', content: currentItem.value.result },
  { label: 'Learned', content: currentItem.value.learned },
])
</script>

<template>
  <DocumentationLayout
    eyebrow="Engineering Notes"
    title="Troubleshooting"
    description="실제 구현 중 발생한 문제와 해결 과정을 기록했습니다."
  >
    <template #sidebar>
      <p class="docs-sidebar__title">Troubleshooting</p>
      <nav class="docs-sidebar__nav" aria-label="Troubleshooting 선택">
        <RouterLink
          v-for="(item, index) in troubleshootingItems"
          :key="item.id"
          :to="`/troubleshooting/${item.id}`"
          class="docs-sidebar__link"
        >
          {{ String(index + 1).padStart(2, '0') }}. {{ item.title }}
        </RouterLink>
      </nav>
    </template>

    <article class="troubleshooting-article">
      <div class="troubleshooting-article__heading">
        <Tag :value="`Troubleshooting #${currentItem.id.padStart(2, '0')}`" severity="secondary" />
        <h2>{{ currentItem.title }}</h2>
      </div>

      <section v-for="section in sections" :key="section.label" class="troubleshooting-section">
        <h3>{{ section.label }}</h3>
        <p>{{ section.content }}</p>
        <pre v-if="section.label === 'Solution' && currentItem.code"><code>{{ currentItem.code }}</code></pre>
      </section>
    </article>
  </DocumentationLayout>
</template>

<style scoped>
.troubleshooting-article {
  max-width: 760px;
  margin: 0 auto;
}

.troubleshooting-article__heading {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--site-border);
}

.troubleshooting-article__heading h2 {
  margin: 12px 0 0;
  color: var(--site-text);
  font-size: clamp(1.45rem, 3vw, 2rem);
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.troubleshooting-section {
  padding: 24px 0;
  border-bottom: 1px solid var(--site-border);
}

.troubleshooting-section:last-child {
  border-bottom: 0;
}

.troubleshooting-section h3 {
  margin: 0 0 8px;
  color: var(--site-orange);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.troubleshooting-section p {
  margin: 0;
  color: var(--site-text);
  line-height: 1.75;
}

.troubleshooting-section pre {
  overflow-x: auto;
  margin: 18px 0 0;
  padding: 18px;
  color: var(--site-text);
  background: var(--site-surface-secondary);
  border: 1px solid var(--site-border);
  border-radius: 8px;
  font-size: 0.84rem;
  line-height: 1.65;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .troubleshooting-section pre {
    transition: none;
  }
}
</style>

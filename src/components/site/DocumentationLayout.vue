<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="docs-page mx-auto w-full max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
    <header class="docs-page__header mb-8 border-b pb-6">
      <p v-if="eyebrow" class="docs-page__eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </header>

    <div class="docs-layout grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      <aside class="docs-sidebar lg:sticky lg:top-24 lg:self-start">
        <slot name="sidebar" />
      </aside>

      <main :key="$route.fullPath" class="docs-content min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.docs-page {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
}

@keyframes docs-content-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.docs-page__header {
  border-color: var(--site-border);
  transition:
    color 0.3s ease,
    border-color 0.3s ease;
}

.docs-page__eyebrow {
  margin-bottom: 6px;
  color: var(--site-orange);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.docs-page__header h1 {
  margin: 0;
  color: var(--site-text);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.035em;
}

.docs-page__header p:last-child {
  max-width: 680px;
  margin-top: 10px;
  color: var(--site-text-muted);
}

.docs-sidebar {
  padding: 12px;
  background: var(--site-surface);
  border: 1px solid var(--site-border);
  border-radius: 10px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

:deep(.docs-sidebar__title) {
  margin: 0 8px 8px;
  color: var(--site-text-muted);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

:deep(.docs-sidebar__nav) {
  display: grid;
  gap: 3px;
}

:deep(.docs-sidebar__link) {
  padding: 9px 10px;
  color: var(--site-text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border-left: 3px solid transparent;
  border-radius: 4px;
}

:deep(.docs-sidebar__link:hover) {
  color: var(--site-text);
  text-decoration: none;
  background: var(--site-surface-secondary);
}

:deep(.docs-sidebar__link.router-link-exact-active) {
  color: var(--site-red);
  background: color-mix(in srgb, var(--site-red) 7%, transparent);
  border-left-color: var(--site-red);
}

.docs-content {
  padding: 24px;
  background: var(--site-surface);
  border: 1px solid var(--site-border);
  border-radius: 10px;
  animation: docs-content-enter 0.65s ease both;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

@media (max-width: 1023px) {
  .docs-sidebar {
    overflow-x: auto;
  }

  :deep(.docs-sidebar__title) {
    display: none;
  }

  :deep(.docs-sidebar__nav) {
    display: flex;
    width: max-content;
  }

  :deep(.docs-sidebar__link) {
    border-bottom: 2px solid transparent;
    border-left: 0;
  }

  :deep(.docs-sidebar__link.router-link-exact-active) {
    border-bottom-color: var(--site-red);
  }
}

@media (max-width: 640px) {
  .docs-page {
    padding-top: 28px;
  }

  .docs-content {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .docs-content {
    animation: none;
  }

  .docs-page__header,
  .docs-sidebar,
  .docs-content {
    transition: none;
  }
}
</style>

<script setup></script>

<template>
  <div class="base-card">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.base-card {
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  background: var(--color-surface);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>

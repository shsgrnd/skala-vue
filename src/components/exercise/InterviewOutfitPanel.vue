<script setup>
import Card from 'primevue/card'
import Tag from 'primevue/tag'

defineProps({
  city: { type: Object, default: null },
  recommendation: { type: Object, default: null },
})
</script>

<template>
  <Card class="outfit-panel" aria-live="polite">
    <template #content>
      <div class="outfit-panel__heading">
        <div>
          <p class="outfit-panel__kicker">Interview Outfit</p>
          <h2>오늘의 면접 복장</h2>
        </div>
        <Tag v-if="city" :value="`${city.name} 기준`" severity="secondary" />
      </div>

      <p v-if="!recommendation" class="outfit-panel__empty">날씨 카드를 선택해주세요.</p>

      <template v-else>
        <dl class="outfit-list">
          <div>
            <dt>상의</dt>
            <dd>{{ recommendation.top }}</dd>
          </div>
          <div>
            <dt>하의</dt>
            <dd>{{ recommendation.bottom }}</dd>
          </div>
          <div>
            <dt>아우터</dt>
            <dd>{{ recommendation.outer }}</dd>
          </div>
          <div>
            <dt>신발</dt>
            <dd>{{ recommendation.shoes }}</dd>
          </div>
        </dl>

        <section class="outfit-extra">
          <h3>준비물</h3>
          <ul v-if="recommendation.accessories.length">
            <li v-for="item in recommendation.accessories" :key="item">{{ item }}</li>
          </ul>
          <p v-else>추가 준비물 없음</p>
        </section>

        <section class="outfit-tip">
          <h3>Tip</h3>
          <ul v-if="recommendation.tips.length">
            <li v-for="tip in recommendation.tips" :key="tip">{{ tip }}</li>
          </ul>
          <p v-else>기본 면접 복장을 단정하게 준비하세요.</p>
        </section>
      </template>
    </template>
  </Card>
</template>

<style scoped>
.outfit-panel {
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

.outfit-panel__heading {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--site-border);
}

.outfit-panel__kicker {
  margin: 0 0 3px;
  color: var(--site-text-muted);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.outfit-panel h2 {
  margin: 0;
  padding: 0;
  color: var(--site-text);
  border: 0;
  font-size: 1.15rem;
}

.outfit-panel__empty {
  margin: 24px 0 0;
  color: var(--site-text-muted);
}

.outfit-list {
  display: grid;
  gap: 0;
  margin: 18px 0 0;
}

.outfit-list div {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid var(--site-border);
}

.outfit-list dt {
  color: var(--site-text-muted);
  font-size: 0.8rem;
  font-weight: 700;
}

.outfit-list dd {
  margin: 0;
  color: var(--site-text);
  font-size: 0.9rem;
}

.outfit-extra,
.outfit-tip { margin-top: 20px; }

.outfit-extra h3,
.outfit-tip h3 {
  margin: 0 0 8px;
  color: var(--site-text);
  font-size: 0.84rem;
}

.outfit-extra p,
.outfit-extra ul,
.outfit-tip p,
.outfit-tip ul {
  margin: 0;
  padding-left: 18px;
  color: var(--site-text-muted);
  font-size: 0.86rem;
}

.outfit-extra p,
.outfit-tip p { padding-left: 0; }

.outfit-tip {
  padding: 16px;
  background: var(--site-surface-secondary);
  border-radius: 14px;
}

@media (prefers-reduced-motion: reduce) {
  .outfit-panel {
    transition: none;
  }
}
</style>

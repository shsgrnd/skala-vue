<script setup>
defineProps({
  showHome: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <section class="guide-container">
    <h3>👕 기온별 옷차림 가이드</h3>
    <p>체감온도에 맞는 옷차림을 확인해보세요.</p>

    <div class="guide-list">
      <article class="guide-card hot">
        <h4>🔥 Hot · 30°C 이상</h4>
        <p>반팔 또는 나시를 입고, 손선풍기를 준비하세요.</p>
      </article>
      <article class="guide-card warm">
        <h4>☀️ Warm · 23~29°C</h4>
        <p>
          반팔 또는 나시를 추천드리나, 저녁에 추울수도 있으니 일교차가 크면 얇은 겉옷을 챙기세요.
        </p>
      </article>
      <article class="guide-card cool">
        <h4>❄️ Cool · 23°C 미만</h4>
        <p>얇은 셔츠 및 가디건 등을 추천합니다.</p>
      </article>
    </div>

    <RouterLink v-if="showHome" to="/" class="home-link">← 대시보드 홈으로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.guide-container {
  padding: 20px;
  background: #fff;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.guide-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.guide-card {
  padding: 16px;
  border-left: 4px solid;
  border-radius: var(--radius-sm);
}

.guide-card h4,
.guide-card p {
  margin: 0;
}

.guide-card p {
  margin-top: 6px;
}

.guide-card.hot {
  color: #212121;
  background: #ff7675;
  border-color: #d63031;
}

.guide-card.warm {
  color: #424242;
  background: #fdcb6e;
  border-color: #e0a800;
}

.guide-card.cool {
  color: #262626;
  background: #74b9ff;
  border-color: #0984e3;
}

.home-link {
  display: block;
  margin-top: 16px;
  padding: 10px;
  color: #fff;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  background: #2c3e50;
  border-radius: var(--radius-sm);
}
</style>

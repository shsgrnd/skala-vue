<script setup>
defineProps({
  selectedCityInfo: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="weather-status-bar">
    {{ selectedCityInfo }}
  </div>
</template>

<style scoped>
.weather-status-bar {
  padding: 10px;
  font-weight: 600;
  text-align: center;
  white-space: pre-line;
  background: var(--color-primary-soft);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-sm);
}

.hot {
  color: #212121;
  background-color: #ff7675;
  border-left-color: #d63031;
}
.warm {
  color: #424242;
  background-color: #fdcb6e;
  border-left-color: #e0a800;
}
.cool {
  color: #262626;
  background-color: #74b9ff;
  border-left-color: #0984e3;
}
</style>

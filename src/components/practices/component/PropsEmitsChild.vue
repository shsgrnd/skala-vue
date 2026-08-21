<script setup>
import { ref } from 'vue'

defineProps({
  parentData: {
    type: String,
    required: true,
  },
})

const newVal = ref('')

const emit = defineEmits(['update-request'])

const sendNotification = () => {
  emit('update-request', newVal.value)
}
</script>

<template>
  <div class="child-container">
    <h2>하위 컴포넌트 (Child)</h2>
    <p>
      수신된 Props 데이터: <strong>{{ parentData }}</strong>
    </p>
    <input
      @keydown.enter="sendNotification"
      type="text"
      v-model="newVal"
      placeholder="여기에 입력해주세요"
    />
    <br />
    <button @click="sendNotification">상위 컴포넌트로 갱신 요청</button>
  </div>
</template>

<style scoped></style>

<script setup>
const id = 'user-profile-card'
const src = 'https://www.skax.co.kr/wp-content/uploads/logo-1.svg'
</script>

<template>
    <div class="practice-section">
        <h2>v-bind 디렉티브 고급 (단축 문법)</h2>
        <div :id>
            <img :src alt="SK AX 로고" style="width: 100px"  />
        </div>

    </div>
</template>



<style lang="scss" scoped>

</style>
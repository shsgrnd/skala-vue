<script setup>
// import { ref } from 'vue'

const welcomeMessage = 'Welcome to Skala-vue';
</script>


<template>
    <div class="practice-section">
        <h2>{{ welcomeMessage }}</h2>
        <p>{{  welcomeMessage.toUpperCase() }}</p>
        <p>{{ 'Random number: ' + Math.ceil(Math.random() * 1000) }}</p>

    </div>
</template>



<style lang="scss" scoped>

</style>
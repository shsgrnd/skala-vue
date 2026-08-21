<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import EventBasic from './components/practices/basic/EventBasic.vue'
import EventModifier from './components/practices/basic/EventModifier.vue'
import EventObject from './components/practices/basic/EventObject.vue'
import ModelBasic from './components/practices/basic/ModelBasic.vue'
import ModelForm from './components/practices/basic/ModelForm.vue'
import ModelModifier from './components/practices/basic/ModelModifier.vue'
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'
import StyleScoped from './components/practices/basic/StyleScoped.vue'
import VueBind from './components/practices/basic/VueBind.vue'
import VueBindClass from './components/practices/basic/VueBindClass.vue'
import VueBindShorthand from './components/practices/basic/VueBindShorthand.vue'
import VueBindStyle from './components/practices/basic/VueBindStyle.vue'
import VueFor from './components/practices/basic/VueFor.vue'
import VueHtml from './components/practices/basic/VueHtml.vue'
import VueHtmlXss from './components/practices/basic/VueHtmlXss.vue'
import VueIf from './components/practices/basic/VueIf.vue'
import VueShow from './components/practices/basic/VueShow.vue'
import VueText from './components/practices/basic/VueText.vue'
</script>

<template>
  <div class="practice-container">
    <h1>1. 학습 환경 구성</h1>
    <hr />
    <SampleOne />
    <SampleTwo />
    <h1>2. Vue Directive</h1>
    <hr />
    <VueHtml />
    <VueHtmlXss />
    <VueText />
    <VueBind />
    <VueBindClass />
    <VueBindStyle />
    <VueBindShorthand />
    <VueIf />
    <VueShow />
    <VueFor />
    <h1>3. Vue Event Handling</h1>
    <hr />
    <EventBasic />
    <EventObject />
    <EventModifier />
    <h1>4. Vue Form Handling</h1>
    <hr />
    <ModelBasic />
    <ModelForm />
    <ModelModifier />
    <h1>5. Vue Style Handling</h1>
    <hr />
    <StyleScoped />
  </div>
</template>

<style>
@import './assets/practice.css';
</style>

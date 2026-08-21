import './assets/main.css'

import './assets/exercise.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'

const SkAura = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#ea002c',
      600: '#c90026',
      700: '#a50020',
      800: '#881c2c',
      900: '#741a28',
      950: '#450a14',
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(PrimeVue, {
  theme: {
    preset: SkAura,
    options: {
      darkModeSelector: '.dark',
    },
  },
})

app.mount('#app')

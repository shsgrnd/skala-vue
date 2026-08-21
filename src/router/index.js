import WeatherApiHomeView from '@/views/WeatherApiHomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const validateParam = (key, validValues, fallback) => (to) =>
  validValues.includes(String(to.params[key])) ? true : fallback

const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    component: WeatherApiHomeView,
    meta: { section: 'outfit' },
  },
  {
    path: '/practice',
    redirect: '/practice/day1',
  },
  {
    path: '/practice/:day',
    name: 'PracticeArchive',
    component: () => import('../views/PracticeArchiveView.vue'),
    beforeEnter: validateParam('day', ['day1', 'day2', 'day3'], '/practice/day1'),
    meta: { section: 'practice' },
  },
  {
    path: '/assignments',
    redirect: '/assignments/1',
  },
  {
    path: '/assignments/:id',
    name: 'AssignmentArchive',
    component: () => import('../views/AssignmentArchiveView.vue'),
    beforeEnter: validateParam('id', ['1', '2', '3', '4', '5'], '/assignments/1'),
    meta: { section: 'assignments' },
  },
  {
    path: '/troubleshooting',
    redirect: '/troubleshooting/1',
  },
  {
    path: '/troubleshooting/:id',
    name: 'Troubleshooting',
    component: () => import('../views/TroubleshootingView.vue'),
    beforeEnter: validateParam(
      'id',
      ['1', '2', '3', '4', '5', '6', '7'],
      '/troubleshooting/1',
    ),
    meta: { section: 'troubleshooting' },
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    component: () => import('../views/WeatherAboutView.vue'),
    meta: { section: 'outfit' },
  },
  {
    path: '/weather/:cityId(city_\\d+)',
    name: 'LegacyWeatherDetail',
    component: () => import('../views/WeatherDetailView.vue'),
    meta: { section: 'assignments' },
  },
  {
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    component: () => import('../views/WeatherApiDetailView.vue'),
    meta: { section: 'outfit' },
  },
  {
    path: '/guide',
    name: 'WeatherGuide',
    component: () => import('../views/WeatherGuideView.vue'),
    meta: { section: 'outfit' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteCityIds = ref([])
  const favoriteCount = computed(() => favoriteCityIds.value.length)

  const isFavorite = (cityId) => favoriteCityIds.value.includes(cityId)

  function toggleFavorite(cityId) {
    const index = favoriteCityIds.value.indexOf(cityId)

    if (index === -1) {
      favoriteCityIds.value.push(cityId)
    } else {
      favoriteCityIds.value.splice(index, 1)
    }
  }

  return { favoriteCityIds, favoriteCount, isFavorite, toggleFavorite }
})

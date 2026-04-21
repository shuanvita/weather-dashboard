import { ref } from 'vue'
import { getCoordsByCity, getWeatherByCoords } from '@/entities/weather'
import type { Coords, ForecastResponse } from '@/entities/weather'
import { weatherConfig } from '@/shared/config'

export const useForecast = () => {
  const city = ref<string>(weatherConfig.defaultCity)
  const forecast = ref<ForecastResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadForecast = async ({ latitude, longitude }: Coords) => {
    isLoading.value = true
    error.value = null

    try {
      const data = await getWeatherByCoords(latitude, longitude)
      forecast.value = data
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const loadForecastByCity = async (cityName: string) => {
    const normalizedCity = cityName.trim() || weatherConfig.defaultCity

    const coords = await getCoordsByCity(normalizedCity)
    city.value = normalizedCity
    return loadForecast(coords)
  }

  const clearForecast = () => {
    forecast.value = null
    error.value = null
  }

  return {
    city,
    forecast,
    isLoading,
    error,
    loadForecast,
    loadForecastByCity,
    clearForecast,
  }
}

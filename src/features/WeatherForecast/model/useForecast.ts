import { ref } from 'vue'
import { getAirQualityIndexByCoords, getCoordsByCity, getWeatherByCoords } from '@/entities/weather'
import type { Coords, ForecastResponse } from '@/entities/weather'
import { weatherConfig } from '@/shared/config'

export const useForecast = () => {
  const city = ref<string>(weatherConfig.defaultCity)
  const forecast = ref<ForecastResponse | null>(null)
  const airQualityIndex = ref<number | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadForecast = async ({ latitude, longitude }: Coords) => {
    isLoading.value = true
    error.value = null

    try {
      const data = await getWeatherByCoords(latitude, longitude)
      forecast.value = data

      try {
        airQualityIndex.value = await getAirQualityIndexByCoords(latitude, longitude)
      } catch {
        airQualityIndex.value = null
      }

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
    airQualityIndex.value = null
    error.value = null
  }

  return {
    city,
    forecast,
    airQualityIndex,
    isLoading,
    error,
    loadForecast,
    loadForecastByCity,
    clearForecast,
  }
}

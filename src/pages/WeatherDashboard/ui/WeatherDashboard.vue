<script setup lang="ts">
import { onMounted } from 'vue'
import { useForecast } from '@/features/WeatherForecast'
import { weatherConfig } from '@/shared/config'
import { CurrentWeather } from '@/widgets/CurrentWeather'
import { WeatherOverview } from '@/widgets/WeatherOverview'

const { city, forecast, isLoading, error, loadForecastByCity } = useForecast()

onMounted(() => {
  void loadForecastByCity(weatherConfig.defaultCity)
})

const onSearchCity = (cityName: string) => {
  void loadForecastByCity(cityName)
}
</script>

<template>
  <div class="container">
    <main class="grid gap-16.5 xl:grid-cols-[360px_1fr] xl:gap-8">
      <CurrentWeather
        class="weather-panel"
        :city="city"
        :forecast="forecast"
        :is-loading="isLoading"
        :error="error"
        @search-city="onSearchCity"
      />
      <WeatherOverview class="weather-panel min-w-0" :forecast="forecast" />
    </main>
  </div>
</template>

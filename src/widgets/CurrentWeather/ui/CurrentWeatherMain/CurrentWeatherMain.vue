<script setup lang="ts">
import { computed, inject } from 'vue'
import { VSvg } from '@/shared/ui/VSvg'
import { currentWeatherContextKey } from '@/widgets/CurrentWeather/model/currentWeatherContext'

const weatherContext = inject(currentWeatherContextKey)

const iconByWeatherCode = (weatherCode: number) => {
  if (weatherCode === 0) {
    return 'sun'
  }

  if ([1, 2, 3].includes(weatherCode)) {
    return 'cloudy'
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return 'thunderstorm'
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    return 'rain'
  }

  if ([56, 57].includes(weatherCode)) {
    return 'drizzle'
  }

  return 'sun-rain'
}

const selectedDayIndex = computed(() => {
  const forecast = weatherContext?.forecast.value

  if (!forecast) {
    return 0
  }

  const maxIndex = forecast.daily.time.length - 1
  return Math.min(weatherContext?.selectedDayIndex.value ?? 0, Math.max(maxIndex, 0))
})

const currentTemperature = computed(() => {
  if (!weatherContext || weatherContext.isLoading.value) {
    return '--'
  }

  if (!weatherContext.forecast.value) {
    return '--'
  }

  const dayIndex = selectedDayIndex.value
  return Math.round(weatherContext.forecast.value.daily.temperature_2m_mean[dayIndex] ?? 0)
})

const currentDay = computed(() => {
  const forecast = weatherContext?.forecast.value

  if (!forecast) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())
  }

  const dayIndex = selectedDayIndex.value
  const date = forecast.daily.time[dayIndex]
  return date
    ? new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date))
    : '--'
})

const currentIcon = computed(() => {
  const forecast = weatherContext?.forecast.value

  if (!forecast) {
    return 'sun-rain'
  }

  const dayIndex = selectedDayIndex.value
  const weatherCode = forecast.daily.weather_code[dayIndex] ?? 0
  return iconByWeatherCode(weatherCode)
})

const cityTitle = computed(() => weatherContext?.city.value ?? 'Moscow')
</script>

<template>
  <div class="xl:border-stroke flex flex-col items-center xl:border-b xl:pb-6">
    <VSvg class="mb-4 h-30 w-30 xl:mb-12 xl:h-40 xl:w-40" :icon="currentIcon" />
    <div class="mb-4 flex items-start text-[72px]/[1] font-medium xl:mb-8 xl:text-[80px]/[1]">
      {{ currentTemperature }}
      <sup class="self-start pt-6 text-[36px]/[1] font-normal xl:pt-7 xl:text-[40px]/[1]">°C</sup>
    </div>
    <div class="text-size-title flex w-full items-center justify-center gap-3 xl:justify-between">
      <div class="font-medium">{{ cityTitle }}</div>
      <div class="text-fg-muted">{{ currentDay }}</div>
    </div>
  </div>
</template>

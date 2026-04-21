<script setup lang="ts">
import { computed, inject } from 'vue'
import { VSvg } from '@/shared/ui/VSvg'
import { currentWeatherContextKey } from '@/widgets/CurrentWeather/model/currentWeatherContext'

const weatherContext = inject(currentWeatherContextKey)

const currentTemperature = computed(() => {
  if (!weatherContext || weatherContext.isLoading.value) {
    return '--'
  }

  if (!weatherContext.forecast.value) {
    return '--'
  }

  return Math.round(weatherContext.forecast.value.current.temperature_2m)
})

const currentDay = computed(() =>
  new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())
)

const cityTitle = computed(() => weatherContext?.city.value ?? 'Moscow')
</script>

<template>
  <div class="xl:border-stroke flex flex-col items-center xl:border-b xl:pb-6">
    <VSvg class="mb-4 h-30 w-30 xl:mb-12 xl:h-40 xl:w-40" icon="sun-rain" />
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

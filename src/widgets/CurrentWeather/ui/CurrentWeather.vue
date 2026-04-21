<script setup lang="ts">
import { provide, toRef } from 'vue'
import type { ForecastResponse } from '@/entities/weather'
import { SearchCity } from '@/features/SearchCity'
import { CurrentWeatherMain } from '@/widgets/CurrentWeather/ui/CurrentWeatherMain'
import { CurrentWeatherDetails } from '@/widgets/CurrentWeather/ui/CurrentWeatherDetails'
import { CurrentWeatherMetrics } from '@/widgets/CurrentWeather/ui/CurrentWeatherMetrics'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { currentWeatherContextKey } from '@/widgets/CurrentWeather/model/currentWeatherContext'

const props = defineProps<{
  city: string
  forecast: ForecastResponse | null
  isLoading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  (event: 'search-city', value: string): void
}>()

provide(currentWeatherContextKey, {
  city: toRef(props, 'city'),
  forecast: toRef(props, 'forecast'),
  isLoading: toRef(props, 'isLoading'),
  error: toRef(props, 'error'),
})
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="mb-6 xl:mb-0">
      <div class="mb-7 xl:mb-14 grid grid-cols-2 gap-3 xl:grid-cols-1">
        <SearchCity
          :model-value="props.city"
          :is-loading="props.isLoading"
          :error="props.error"
          @submit="emit('search-city', $event)"
        />
        <ThemeSwitcher class="xl:hidden" />
      </div>
      <CurrentWeatherMain class="mb-5.75 xl:mb-6.25" />
      <CurrentWeatherDetails />
    </div>
    <CurrentWeatherMetrics class="mt-auto" />
  </div>
</template>

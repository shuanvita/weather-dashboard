<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ForecastResponse } from '@/entities/weather'

import { ForecastDayCard } from '@/entities/weather'

const props = withDefaults(
  defineProps<{
    forecast: ForecastResponse | null
    modelValue?: number
  }>(),
  {}
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

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

const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' })

const forecastDays = computed(() => {
  const forecast = props.forecast

  if (!forecast) {
    return []
  }

  return forecast.daily.time.map((date, index) => ({
    day: dayFormatter.format(new Date(date)),
    icon: iconByWeatherCode(forecast.daily.weather_code[index] ?? 0),
    temperature: Math.round(forecast.daily.temperature_2m_max[index] ?? 0),
  }))
})

const activeDayIndex = ref(props.modelValue ?? 0)

const isSameDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate()

const findTodayIndex = (forecast: ForecastResponse) => {
  const today = new Date()
  const index = forecast.daily.time.findIndex((date) => isSameDate(new Date(date), today))
  return index >= 0 ? index : 0
}

watch(
  () => props.modelValue,
  (value) => {
    activeDayIndex.value = value ?? 0
  }
)

watch(
  () => props.forecast,
  (forecast) => {
    if (!forecast || props.modelValue !== undefined) {
      return
    }

    const todayIndex = findTodayIndex(forecast)
    activeDayIndex.value = todayIndex
    emit('update:modelValue', todayIndex)
  },
  { immediate: true }
)

const selectDay = (index: number) => {
  activeDayIndex.value = index
  emit('update:modelValue', index)
}
</script>

<template>
  <ul class="flex xl:grid xl:grid-cols-7 gap-3 xl:gap-4">
    <li
      class="w-28 shrink-0 xl:w-full"
      v-for="(day, index) in forecastDays"
      :key="`${day.day}-${index}`"
    >
      <ForecastDayCard
        :day="day.day"
        :icon="day.icon"
        :temperature="day.temperature"
        :is-active="index === activeDayIndex"
        @click="selectDay(index)"
      />
    </li>
  </ul>
</template>

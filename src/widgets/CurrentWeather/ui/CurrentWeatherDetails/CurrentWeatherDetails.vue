<script setup lang="ts">
import { computed, inject } from 'vue'
import { VSvg } from '@/shared/ui/VSvg'
import { currentWeatherContextKey } from '@/widgets/CurrentWeather/model/currentWeatherContext'

const weatherContext = inject(currentWeatherContextKey)

const precipitationConditionByWeatherCode = (weatherCode: number) => {
  if ([95, 96, 99].includes(weatherCode)) {
    return { icon: 'thunderstorm', text: 'Thunderstorm' }
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    return { icon: 'rain', text: 'Rain' }
  }

  if ([56, 57].includes(weatherCode)) {
    return { icon: 'drizzle', text: 'Drizzle' }
  }

  if ([1, 2, 3].includes(weatherCode)) {
    return { icon: 'cloudy', text: 'Cloudy' }
  }

  return { icon: 'sun', text: 'Clear' }
}

const details = computed(() => {
  const forecast = weatherContext?.forecast.value

  if (!forecast) {
    return [
      { icon: 'rain', text: '--' },
      { icon: 'min-temp', text: 'Min Temperature - --°C' },
      { icon: 'max-temp', text: 'Max Temperature - --°C' },
    ]
  }

  const maxIndex = forecast.daily.time.length - 1
  const dayIndex = Math.min(weatherContext?.selectedDayIndex.value ?? 0, Math.max(maxIndex, 0))
  const weatherCode = forecast.daily.weather_code[dayIndex] ?? 0
  const precipitationCondition = precipitationConditionByWeatherCode(weatherCode)

  return [
    {
      icon: precipitationCondition.icon,
      text: precipitationCondition.text,
    },
    {
      icon: 'min-temp',
      text: `Min Temperature - ${Math.round(forecast.daily.temperature_2m_min[dayIndex] ?? 0)}°C`,
    },
    {
      icon: 'max-temp',
      text: `Max Temperature - ${Math.round(forecast.daily.temperature_2m_max[dayIndex] ?? 0)}°C`,
    },
  ]
})
</script>

<template>
  <ul class="bg-card border-stroke space-y-4 rounded-[14px] border p-5 xl:p-0 xl:bg-transparent xl:border-0">
    <li
      class="flex items-center gap-4"
      v-for="(item, index) in details"
      :key="`weather-details-${index}`"
    >
      <VSvg :icon="item.icon" :size="20" />
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

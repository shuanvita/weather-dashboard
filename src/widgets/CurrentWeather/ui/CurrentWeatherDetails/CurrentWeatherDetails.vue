<script setup lang="ts">
import { computed, inject } from 'vue'
import { VSvg } from '@/shared/ui/VSvg'
import { currentWeatherContextKey } from '@/widgets/CurrentWeather/model/currentWeatherContext'

const weatherContext = inject(currentWeatherContextKey)

const details = computed(() => {
  const forecast = weatherContext?.forecast.value

  if (!forecast) {
    return [
      { icon: 'rain', text: '--' },
      { icon: 'min-temp', text: 'Min Temperature - --°C' },
      { icon: 'max-temp', text: 'Max Temperature - --°C' },
    ]
  }

  return [
    {
      icon: 'rain',
      text: forecast.current.precipitation > 0 ? 'Rain' : 'No Rain',
    },
    {
      icon: 'min-temp',
      text: `Min Temperature - ${Math.round(forecast.daily.temperature_2m_min[0] ?? 0)}°C`,
    },
    {
      icon: 'max-temp',
      text: `Max Temperature - ${Math.round(forecast.daily.temperature_2m_max[0] ?? 0)}°C`,
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

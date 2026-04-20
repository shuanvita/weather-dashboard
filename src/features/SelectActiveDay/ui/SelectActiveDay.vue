<script setup lang="ts">
import { ref } from 'vue'

import { ForecastDayCard } from '@/entities/weather'

const forecastDays = [
  { day: 'Sun', icon: 'sun-rain', temperature: 32 },
  { day: 'Mon', icon: 'sun', temperature: 31 },
  { day: 'Tue', icon: 'cloudy', temperature: 27 },
  { day: 'Wed', icon: 'rain', temperature: 31 },
  { day: 'Thu', icon: 'drizzle', temperature: 25 },
  { day: 'Fri', icon: 'thunderstorm', temperature: 26 },
  { day: 'Sat', icon: 'sun-rain', temperature: 30 },
]

const activeDayIndex = ref(0)
</script>

<template>
  <ul class="flex xl:grid xl:grid-cols-7 gap-3 xl:gap-4">
    <li class="w-28 shrink-0 xl:w-full" v-for="(day, index) in forecastDays" :key="day.day">
      <ForecastDayCard
        :day="day.day"
        :icon="day.icon"
        :temperature="day.temperature"
        :is-active="index === activeDayIndex"
        @click="activeDayIndex = index"
      />
    </li>
  </ul>
</template>

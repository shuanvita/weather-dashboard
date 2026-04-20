<script setup lang="ts">
import { CurrentWeather } from '@/widgets/CurrentWeather'
import { WeatherOverview } from '@/widgets/WeatherOverview'
</script>

<template>
  <div class="container">
    <main class="grid gap-16.5 xl:grid-cols-[360px_1fr] xl:gap-8">
      <CurrentWeather class="weather-panel" />
      <WeatherOverview class="weather-panel min-w-0" />
    </main>
  </div>
</template>

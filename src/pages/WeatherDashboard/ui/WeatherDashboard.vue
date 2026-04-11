<script setup lang="ts">
import { CurrentWeather } from '@/widgets/CurrentWeather'
</script>

<template>
  <div class="container">
    <main class="grid gap-6 xl:grid-cols-[360px_1fr] xl:gap-8">
      <CurrentWeather class="weather-panel" />
      <div class="weather-panel">Right Panel</div>
    </main>
  </div>
</template>

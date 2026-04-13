<script setup lang="ts">
import { SearchCity } from '@/features/SearchCity'
import { CurrentWeatherMain } from '@/widgets/CurrentWeather/ui/CurrentWeatherMain'
import { CurrentWeatherDetails } from '@/widgets/CurrentWeather/ui/CurrentWeatherDetails'
import { CurrentWeatherMetrics } from '@/widgets/CurrentWeather/ui/CurrentWeatherMetrics'
</script>

<template>
  <div class="flex h-full flex-col">
    <div>
      <SearchCity class="mb-14" />
      <CurrentWeatherMain class="mb-6.25" />
      <CurrentWeatherDetails />
    </div>
    <CurrentWeatherMetrics class="mt-auto" />
  </div>
</template>

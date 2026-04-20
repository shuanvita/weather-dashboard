<script setup lang="ts">
import { SearchCity } from '@/features/SearchCity'
import { CurrentWeatherMain } from '@/widgets/CurrentWeather/ui/CurrentWeatherMain'
import { CurrentWeatherDetails } from '@/widgets/CurrentWeather/ui/CurrentWeatherDetails'
import { CurrentWeatherMetrics } from '@/widgets/CurrentWeather/ui/CurrentWeatherMetrics'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="mb-6 xl:mb-0">
      <div class="mb-7 xl:mb-14 grid grid-cols-2 gap-3 xl:grid-cols-1">
        <SearchCity />
        <ThemeSwitcher class="xl:hidden" />
      </div>
      <CurrentWeatherMain class="mb-5.75 xl:mb-6.25" />
      <CurrentWeatherDetails />
    </div>
    <CurrentWeatherMetrics class="mt-auto" />
  </div>
</template>

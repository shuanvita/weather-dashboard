<script setup lang="ts">
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { SelectActiveDay } from '@/features/SelectActiveDay'
import {
  PrecipitationCard,
  SunriseSunsetCard,
  WeatherMetricCard,
  weatherOverviewMetrics,
} from '@/entities/weather'
</script>

<template>
  <div>
    <div class="mb-12">
      <div class="mb-10 flex items-center justify-between">
        <div class="text-size-title flex items-center gap-8 font-medium">
          <button class="text-fg-muted hover:text-fg cursor-pointer">Today</button>
          <button class="underline decoration-wavy decoration-1 underline-offset-3">Week</button>
        </div>
        <ThemeSwitcher />
      </div>
      <SelectActiveDay />
    </div>
    <h2 class="mb-6 text-size-title font-medium">Today's Overview</h2>
    <ul class="grid gap-6 xl:grid-cols-3">
      <li v-for="item in weatherOverviewMetrics" :key="item.id" :class="{ 'xl:col-span-2': item.type === 'precipitation' }">
        <WeatherMetricCard
          v-if="item.type === 'metric'"
          :title="item.title"
          :value="item.value"
          :description="item.description"
          :icon="item.icon"
          :tone="item.tone"
        />
        <PrecipitationCard v-else-if="item.type === 'precipitation'" :title="item.title" :points="item.points" />
        <SunriseSunsetCard
          v-else
          :title="item.title"
          :sunrise="item.sunrise"
          :sunset="item.sunset"
          :sunrise-icon="item.sunriseIcon"
          :sunset-icon="item.sunsetIcon"
        />
      </li>
    </ul>
  </div>
</template>

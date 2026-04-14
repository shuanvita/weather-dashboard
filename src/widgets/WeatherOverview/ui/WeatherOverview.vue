<script setup lang="ts">
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { SelectActiveDay } from '@/features/SelectActiveDay'
import { WeatherMetricCard, weatherOverviewMetrics } from '@/entities/weather'
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-10">
      <div class="text-size-title flex items-center gap-8 font-medium">
        <button class="text-fg-muted cursor-pointer hover:text-fg">Today</button>
        <button class="underline-offset-3 decoration-wavy underline decoration-1">Week</button>
      </div>
      <ThemeSwitcher />
    </div>
    <SelectActiveDay />

    <ul class="mt-10 grid gap-6 xl:grid-cols-3">
      <li v-for="item in weatherOverviewMetrics" :key="item.title">
        <WeatherMetricCard
          :title="item.title"
          :value="item.value"
          :description="item.description"
          :icon="item.icon"
          :tone="item.tone"
        />
      </li>
    </ul>
  </div>
</template>

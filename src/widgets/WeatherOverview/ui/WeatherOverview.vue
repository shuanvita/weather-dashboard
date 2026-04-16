<script setup lang="ts">
import { ref } from 'vue'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { SelectActiveDay } from '@/features/SelectActiveDay'
import {
  PrecipitationCard,
  SunriseSunsetCard,
  WeatherMetricCard,
  weatherOverviewMetrics,
} from '@/entities/weather'
import { SelectOverviewTab } from '@/features/SelectOverviewTab'

type OverviewTab = 'today' | 'week'

const activeTab = ref<OverviewTab>('week')
</script>

<template>
  <div>
    <div class="mb-12">
      <div class="mb-10 flex items-center justify-between">
        <SelectOverviewTab v-model="activeTab" />
        <ThemeSwitcher />
      </div>
      <ul v-if="activeTab === 'today'" class="grid gap-6 xl:grid-cols-2">
        <li>
          <WeatherMetricCard
            layout="inline"
            title="Visibility"
            value="10 km"
            description="Clear"
            icon="visibility"
            tone="good"
          />
        </li>
        <li>
          <WeatherMetricCard
            layout="inline"
            title="Feels Like"
            value="34°"
            description="Hot"
            icon="temp"
            tone="warning"
          />
        </li>
      </ul>
      <SelectActiveDay v-if="activeTab === 'week'" />
    </div>
    <h2 class="text-size-title mb-6 font-medium">Today's Overview</h2>
    <ul class="grid gap-6 xl:grid-cols-3">
      <li
        v-for="item in weatherOverviewMetrics"
        :key="item.id"
        :class="{ 'xl:col-span-2': item.type === 'precipitation' }"
      >
        <WeatherMetricCard
          v-if="item.type === 'metric'"
          :title="item.title"
          :value="item.value"
          :description="item.description"
          :icon="item.icon"
          :tone="item.tone"
        />
        <PrecipitationCard
          v-else-if="item.type === 'precipitation'"
          :title="item.title"
          :points="item.points"
        />
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

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ForecastResponse } from '@/entities/weather'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { SelectActiveDay } from '@/features/SelectActiveDay'
import {
  type WeatherMetricTone,
  type WeatherOverviewItem,
  PrecipitationCard,
  SunriseSunsetCard,
  WeatherMetricCard,
  weatherOverviewMetrics,
} from '@/entities/weather'
import { SelectOverviewTab } from '@/features/SelectOverviewTab'

type OverviewTab = 'today' | 'week'

const props = defineProps<{
  forecast: ForecastResponse | null
  modelValue?: number
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const activeTab = ref<OverviewTab>('week')
const activeDayIndex = computed({
  get: () => props.modelValue ?? 0,
  set: (value: number) => {
    emit('update:modelValue', value)
  },
})

const selectedDayIndex = computed(() => {
  const forecast = props.forecast

  if (!forecast) {
    return 0
  }

  const maxIndex = forecast.daily.time.length - 1
  return Math.min(activeDayIndex.value, Math.max(maxIndex, 0))
})

const todayCards = computed(() => {
  const forecast = props.forecast

  if (!forecast) {
    return [
      {
        title: 'Visibility',
        value: '--',
        description: '--',
        icon: 'visibility',
        tone: 'default' as const,
      },
      {
        title: 'Feels Like',
        value: '--',
        description: '--',
        icon: 'temp',
        tone: 'default' as const,
      },
    ]
  }

  const dayIndex = selectedDayIndex.value
  const visibilityMeters = forecast.daily.visibility_mean[dayIndex] ?? 0
  const visibilityKm = Math.max(0, Math.round(visibilityMeters / 1000))
  const temperature = Math.round(forecast.current.temperature_2m)

  return [
    {
      title: 'Visibility',
      value: `${visibilityKm} km`,
      description: visibilityKm >= 10 ? 'Clear' : visibilityKm >= 5 ? 'Moderate' : 'Low',
      icon: 'visibility',
      tone: (visibilityKm >= 10 ? 'good' : 'default') as WeatherMetricTone,
    },
    {
      title: 'Feels Like',
      value: `${temperature}°`,
      description: temperature >= 30 ? 'Hot' : temperature >= 20 ? 'Warm' : 'Cool',
      icon: 'temp',
      tone: (temperature >= 30 ? 'warning' : 'default') as WeatherMetricTone,
    },
  ]
})

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  hour12: true,
})

const weatherMetrics = computed<WeatherOverviewItem[]>(() => {
  const forecast = props.forecast

  if (!forecast) {
    return weatherOverviewMetrics
  }

  const dayIndex = selectedDayIndex.value

  const uv = Math.round(forecast.daily.uv_index_max[dayIndex] ?? 0)
  const pressure = Math.round(forecast.daily.pressure_msl_mean[dayIndex] ?? 0)
  const sunrise = forecast.daily.sunrise[dayIndex] ?? '--'
  const sunset = forecast.daily.sunset[dayIndex] ?? '--'
  const precipitationPoints = forecast.hourly.precipitation_probability
    .slice(0, 7)
    .map((value, index) => ({
      label: timeFormatter.format(new Date((forecast.hourly.time[index] ?? '').replace(' ', 'T'))),
      value,
    }))

  return weatherOverviewMetrics.map((item) => {
    if (item.id === 'uv-index' && item.type === 'metric') {
      return {
        ...item,
        value: uv,
        description: uv >= 6 ? 'High' : uv >= 3 ? 'Moderate' : 'Low',
        tone: uv >= 6 ? 'warning' : uv >= 3 ? 'default' : 'good',
      }
    }

    if (item.id === 'pressure' && item.type === 'metric') {
      return {
        ...item,
        value: pressure,
      }
    }

    if (item.id === 'precipitation' && item.type === 'precipitation') {
      return {
        ...item,
        points: precipitationPoints,
      }
    }

    if (item.id === 'sunrise-sunset' && item.type === 'sun-cycle') {
      return {
        ...item,
        sunrise: timeFormatter.format(new Date(sunrise.replace(' ', 'T'))),
        sunset: timeFormatter.format(new Date(sunset.replace(' ', 'T'))),
      }
    }

    return item
  })
})
</script>

<template>
  <div>
    <div class="mb-10 xl:mb-12">
      <div class="mb-6 flex items-center justify-between xl:mb-10">
        <SelectOverviewTab v-model="activeTab" />
        <ThemeSwitcher class="hidden xl:flex" />
      </div>
      <ul v-if="activeTab === 'today'" class="grid gap-6 xl:grid-cols-2">
        <li v-for="card in todayCards" :key="card.title">
          <WeatherMetricCard
            layout="inline"
            :title="card.title"
            :value="card.value"
            :description="card.description"
            :icon="card.icon"
            :tone="card.tone"
          />
        </li>
      </ul>
      <div class="overflow-x-auto">
        <SelectActiveDay v-if="activeTab === 'week'" v-model="activeDayIndex" :forecast="forecast" />
      </div>
    </div>
    <h2 class="text-size-title mb-4 xl:mb-6 font-medium">Today's Overview</h2>
    <ul class="grid grid-cols-2 gap-4 xl:gap-6 xl:grid-cols-3">
      <li
        v-for="(item, index) in weatherMetrics"
        :key="item.id"
        :class="[
          index > 1 && 'col-span-2 xl:col-span-1',
          item.type === 'precipitation' && 'xl:col-span-2',
        ]"
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

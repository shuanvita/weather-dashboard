<script setup lang="ts">
import { VSvg } from '@/shared/ui/VSvg'

const data = [
  {
    icon: 'humidity',
    value: '83%',
    text: 'Humidity',
  },
  {
    icon: 'wind',
    value: '6km/h',
    text: 'Wind Speed',
  },
]
</script>

<template>
  <ul
    class="xl:bg-card xl:border-stroke grid w-full grid-cols-2 justify-between gap-4 rounded-[14px] xl:gap-0.5 xl:border xl:p-6"
  >
    <li
      class="bg-card border-stroke flex h-17.75 items-center gap-3 rounded-[10px] border p-4 xl:h-auto xl:border-0 xl:bg-transparent xl:p-0"
      v-for="(item, index) in data"
      :key="`weather-metrics-${index}`"
    >
      <VSvg class="h-6 w-6 xl:h-8 xl:w-8" :icon="item.icon" />
      <div class="flex flex-col gap-0.5">
        <div class="text-[16px] font-semibold">{{ item.value }}</div>
        <div class="text-size-caption text-fg-muted">{{ item.text }}</div>
      </div>
    </li>
  </ul>
</template>

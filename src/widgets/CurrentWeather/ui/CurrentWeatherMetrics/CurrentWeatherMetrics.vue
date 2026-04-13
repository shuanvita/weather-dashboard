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
    class="bg-card border-stroke w-full grid grid-cols-2 justify-between gap-y-4 rounded-[14px] border p-6"
  >
    <li
      class="flex items-center gap-3"
      v-for="(item, index) in data"
      :key="`weather-metrics-${index}`"
    >
      <VSvg :icon="item.icon" :size="32" />
      <div class="flex flex-col gap-0.5">
        <div class="text-[16px] font-semibold">{{ item.value }}</div>
        <div class="text-size-caption text-fg-muted">{{ item.text }}</div>
      </div>
    </li>
  </ul>
</template>

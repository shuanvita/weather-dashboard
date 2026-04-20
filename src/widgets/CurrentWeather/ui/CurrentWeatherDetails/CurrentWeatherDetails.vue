<script setup lang="ts">
import { VSvg } from '@/shared/ui/VSvg'

const data = [
  {
    icon: 'rain',
    text: 'Light Rain',
  },
  {
    icon: 'min-temp',
    text: 'Min Temperature - 24°C',
  },
  {
    icon: 'max-temp',
    text: 'Max Temperature - 31°C',
  },
]
</script>

<template>
  <ul class="bg-card border-stroke space-y-4 rounded-[14px] border p-5 xl:p-0 xl:bg-transparent xl:border-0">
    <li
      class="flex items-center gap-4"
      v-for="(item, index) in data"
      :key="`weather-details-${index}`"
    >
      <VSvg :icon="item.icon" :size="20" />
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

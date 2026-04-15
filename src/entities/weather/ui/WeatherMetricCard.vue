<script setup lang="ts">
import { computed } from 'vue'

import { VSvg } from '@/shared/ui/VSvg'

const props = withDefaults(
  defineProps<{
    title: string
    value: string | number
    description: string
    icon: string
    tone?: 'default' | 'good' | 'warning'
  }>(),
  {
    tone: 'default',
  },
)

const descriptionClass = computed(() => {
  if (props.tone === 'good') {
    return 'text-[#1E7A4C]'
  }

  if (props.tone === 'warning') {
    return 'text-[#F5B544]'
  }

  return 'text-fg'
})
</script>

<template>
  <article class="bg-card border-stroke flex flex-col justify-between gap-6 rounded-[14px] border p-6">
    <p class="text-fg-muted">{{ props.title }}</p>
    <p class="text-size-display leading-none font-semibold">{{ props.value }}</p>
    <div class="flex items-end justify-between">
      <p class="text-[16px] font-medium" :class="descriptionClass">{{ props.description }}</p>
      <VSvg class="text-fg-muted" :icon="props.icon" :size="40" />
    </div>
  </article>
</template>

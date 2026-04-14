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
    return 'text-accent'
  }

  if (props.tone === 'warning') {
    return 'text-[#F5B544]'
  }

  return 'text-fg'
})
</script>

<template>
  <article class="bg-card flex h-[184px] min-w-0 flex-col justify-between rounded-[14px] p-6">
    <p class="text-fg-muted text-[20px]">{{ props.title }}</p>
    <p class="text-[56px] font-semibold leading-none">{{ props.value }}</p>
    <div class="flex items-end justify-between">
      <p class="text-[34px] font-medium" :class="descriptionClass">{{ props.description }}</p>
      <VSvg class="text-fg-muted" :icon="props.icon" :size="40" />
    </div>
  </article>
</template>

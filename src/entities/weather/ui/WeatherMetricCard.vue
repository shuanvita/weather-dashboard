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
    layout?: 'default' | 'inline'
  }>(),
  {
    tone: 'default',
    layout: 'default',
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
  <article
    class="bg-card border-stroke flex flex-col justify-between rounded-[14px] border"
    :class="props.layout === 'inline' ? 'h-35.75 gap-8 px-6 py-5' : 'h-full gap-4 xl:gap-6 p-5 xl:p-6'"
  >
    <p class="text-fg-muted text-[13px] xl:text-body">{{ props.title }}</p>
    <template v-if="props.layout === 'inline'">
      <div class="flex items-center justify-between gap-4">
        <p class="text-[40px] leading-none font-semibold">{{ props.value }}</p>
        <div class="flex items-center gap-2">
          <p class="text-[16px] font-medium" :class="descriptionClass">{{ props.description }}</p>
          <VSvg class="text-fg-muted" :icon="props.icon" :size="24" />
        </div>
      </div>
    </template>
    <template v-else>
      <p class="text-[32px] xl:text-size-display leading-none font-semibold">{{ props.value }}</p>
      <div class="flex items-end justify-between">
        <p class="text-body xl:text-[16px] font-medium" :class="descriptionClass">{{ props.description }}</p>
        <VSvg class="text-fg-muted w-7 h-7 xl:w-10 xl:h-10" :icon="props.icon" />
      </div>
    </template>
  </article>
</template>

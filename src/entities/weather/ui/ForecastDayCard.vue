<script setup lang="ts">
import { VSvg } from '@/shared/ui/VSvg'

const props = defineProps<{
  day: string
  icon: string
  temperature: number
  isActive?: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="border-stroke grid h-35.75 w-full cursor-pointer items-center justify-center gap-3 rounded-[10px] border px-2 py-4 transition-colors"
    :class="
      props.isActive
        ? 'bg-accent text-active-day border-accent shadow-[0_10px_24px_rgba(0,0,0,0.18)]'
        : 'bg-card hover:bg-card-hover text-fg'
    "
  >
    <span class="font-medium">{{ props.day }}</span>
    <VSvg
      :class="props.isActive ? 'text-active-day' : 'text-fg-muted'"
      :icon="props.icon"
      :size="32"
    />
    <span class="text-[16px] font-medium">{{ props.temperature }}°</span>
  </button>
</template>

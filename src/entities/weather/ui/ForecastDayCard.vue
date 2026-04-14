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
    class="grid h-35.75 w-full cursor-pointer items-center justify-center gap-3 rounded-[10px] px-2 py-4 transition-colors"
    :class="
      props.isActive
        ? 'bg-accent text-main shadow-[0_10px_24px_rgba(0,0,0,0.18)]'
        : 'bg-card text-fg hover:bg-card-hover'
    "
  >
    <span class="font-medium">{{ props.day }}</span>
    <VSvg :class="props.isActive ? 'text-main' : 'text-fg-muted'" :icon="props.icon" :size="32" />
    <span class="text-[16px] font-medium">{{ props.temperature }}°</span>
  </button>
</template>

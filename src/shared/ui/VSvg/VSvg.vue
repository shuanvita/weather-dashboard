<script setup lang="ts">
import type { VSvgProps } from '@/shared/ui/VSvg/VSvg.types'

const props = withDefaults(defineProps<VSvgProps>(), {
  size: 16,
})
</script>

<template>
  <svg :width="props.size" :height="props.size" aria-hidden="true">
    <use :href="`/svg/${props.icon}.svg`" />
  </svg>
</template>

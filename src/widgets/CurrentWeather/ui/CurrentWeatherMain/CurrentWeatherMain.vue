<script setup lang="ts">
import { VSvg } from '@/shared/ui/VSvg'
</script>

<template>
  <div class="border-stroke flex flex-col items-center border-b pb-6">
    <VSvg class="mb-4 xl:mb-12 h-30 w-30 xl:h-40 xl:w-40" icon="sun-rain" />
    <div class="mb-4 xl:mb-8 flex items-start text-[72px]/[1] font-medium xl:text-[80px]/[1]">
      30 <sup class="self-start pt-6 xl:pt-7 text-[36px]/[1] font-normal xl:text-[40px]/[1]">°C</sup>
    </div>
    <div class="text-size-title flex w-full items-center gap-3 justify-center xl:justify-between">
      <div class="font-medium">Kuala Lumpur</div>
      <div class="text-fg-muted">Monday</div>
    </div>
  </div>
</template>

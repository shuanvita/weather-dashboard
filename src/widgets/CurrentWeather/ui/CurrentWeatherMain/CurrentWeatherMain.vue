<script setup lang="ts">
import { VSvg } from '@/shared/ui/VSvg'
</script>

<template>
  <div class="border-stroke flex flex-col items-center border-b pb-6">
    <VSvg class="mb-12" icon="sun-rain" :size="160" />
    <div class="mb-8 flex text-[80px]/[1] font-medium">
      30 <sup class="text-[40px]/[1] font-normal">°C</sup>
    </div>
    <div class="text-size-title flex w-full items-center justify-between">
      <div class="font-medium">Kuala Lumpur</div>
      <div class="text-fg-muted">Monday</div>
    </div>
  </div>
</template>

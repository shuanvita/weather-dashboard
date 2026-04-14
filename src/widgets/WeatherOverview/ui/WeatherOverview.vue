<script setup lang="ts">
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { SelectActiveDay } from '@/features/SelectActiveDay'
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="text-size-title flex items-center gap-8 font-medium">
        <button class="text-fg-muted cursor-pointer hover:text-fg">Today</button>
        <button class="underline-offset-3 decoration-wavy underline decoration-1">Week</button>
      </div>
      <ThemeSwitcher />
    </div>
    <SelectActiveDay />
  </div>
</template>

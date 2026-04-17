<script setup lang="ts">
import { computed } from 'vue'
import { type ThemeMode, useThemeSwitcher } from '@/features/ThemeSwitcher/model/useThemeSwitcher'
import { VSvg } from '@/shared/ui/VSvg'

const { isDark, setTheme } = useThemeSwitcher()

const activeTheme = computed<ThemeMode>(() => (isDark.value ? 'dark' : 'light'))

const options: ReadonlyArray<{ label: string; value: ThemeMode; icon: string }> = [
  { label: 'Dark', value: 'dark', icon: 'moon' },
  { label: 'Light', value: 'light', icon: 'sun' },
]
</script>

<template>
  <div
    class="bg-card border-stroke flex h-12.5 items-center gap-1 rounded-full border p-1.5"
    role="radiogroup"
    aria-label="Theme switcher"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="focus-visible:ring-accent/60 flex h-full cursor-pointer items-center justify-center gap-2 rounded-full px-3.5 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
      :class="activeTheme === option.value ? 'bg-theme-switcher text-fg' : 'text-fg-muted hover:text-fg'"
      @click="setTheme(option.value)"
      role="radio"
      :aria-label="`${option.label} theme`"
      :aria-checked="activeTheme === option.value"
    >
      <VSvg :icon="option.icon" />
      <span class="font-medium">{{ option.label }}</span>
    </button>
  </div>
</template>

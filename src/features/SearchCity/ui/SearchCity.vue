<script setup lang="ts">
import { ref } from 'vue'
import { VSvg } from '@/shared/ui/VSvg'

const city = ref('')
</script>

<template>
  <form
    role="search"
    class="bg-card border-stroke flex items-center gap-3 rounded-full border px-5 py-3"
  >
    <button
      class="text-fg-muted hover:text-fg cursor-pointer"
      type="button"
      aria-label="Search city"
    >
      <VSvg class="pointer-events-none" icon="search" :size="20" />
    </button>
    <input
      name="search"
      class="placeholder:text-fg-muted focus-visible:outline-none"
      type="text"
      placeholder="Search city..."
      v-model="city"
    />
  </form>
</template>

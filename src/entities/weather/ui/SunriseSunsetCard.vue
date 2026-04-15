<script setup lang="ts">
import { computed } from 'vue'
import { VSvg } from '@/shared/ui/VSvg'

const props = defineProps<{
  title: string
  sunrise: string
  sunset: string
  sunriseIcon: string
  sunsetIcon: string
}>()

const baseUrl = import.meta.env.BASE_URL

const sunriseIconSrc = computed(() => `${baseUrl}svg/${props.sunriseIcon}.svg`)
const sunsetIconSrc = computed(() => `${baseUrl}svg/${props.sunsetIcon}.svg`)
</script>

<template>
  <article class="bg-card border-stroke flex h-full flex-col rounded-[14px] border p-6">
    <h3 class="text-fg-muted mb-6">{{ props.title }}</h3>
    <div class="flex flex-1 flex-col gap-8 pt-7 pb-6">
      <div class="flex items-center gap-5">
        <div class="bg-main flex h-14 w-14 items-center justify-center rounded-full">
          <VSvg class="text-fg" icon="sunrise" :size="28" />
          <!--          <img class="h-7 w-7" :src="sunriseIconSrc" alt="Sunrise icon" />-->
        </div>
        <div>
          <p class="text-fg-muted mb-1">Sunrise</p>
          <p class="text-fg text-[18px] font-medium">{{ props.sunrise }}</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="bg-main flex h-14 w-14 items-center justify-center rounded-full">
          <VSvg class="text-fg" icon="sunset" :size="28" />
          <!--          <img class="h-7 w-7" :src="sunsetIconSrc" alt="Sunset icon" />-->
        </div>
        <div>
          <p class="text-fg-muted mb-1">Sunset</p>
          <p class="text-fg text-[18px] font-medium">{{ props.sunset }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

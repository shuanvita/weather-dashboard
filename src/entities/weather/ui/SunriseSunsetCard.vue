<script setup lang="ts">
import { VSvg } from '@/shared/ui/VSvg'

const props = defineProps<{
  title: string
  sunrise: string
  sunset: string
  sunriseIcon: string
  sunsetIcon: string
}>()
</script>

<template>
  <article class="bg-card border-stroke flex h-full flex-col rounded-[14px] border p-6">
    <h3 class="text-fg-muted mb-6">{{ props.title }}</h3>
    <div class="flex flex-1 flex-col gap-8 xl:pt-7 xl:pb-6">
      <div class="flex items-center gap-4 xl:gap-5">
        <div
          class="bg-main flex h-12 w-12 items-center justify-center rounded-full xl:h-14 xl:w-14"
        >
          <VSvg class="text-fg h-6 w-6 xl:h-7 xl:w-7" icon="sunrise" />
        </div>
        <div>
          <p class="text-fg-muted xl:text-body mb-1 text-[13px]">Sunrise</p>
          <p class="text-fg text-[16px] font-medium xl:text-[18px]">{{ props.sunrise }}</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div
          class="bg-main flex h-12 w-12 items-center justify-center rounded-full xl:h-14 xl:w-14"
        >
          <VSvg class="text-fg h-6 w-6 xl:h-7 xl:w-7" icon="sunset" />
        </div>
        <div>
          <p class="text-fg-muted xl:text-body mb-1 text-[13px]">Sunset</p>
          <p class="text-fg text-[16px] font-medium xl:text-[18px]">{{ props.sunset }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

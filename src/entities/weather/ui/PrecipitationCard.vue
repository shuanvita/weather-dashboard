<script setup lang="ts">
import { computed } from 'vue'

type PrecipitationPoint = {
  label: string
  value: number
}

const props = defineProps<{
  title: string
  points: PrecipitationPoint[]
}>()

const yTicks = [100, 80, 60, 40, 20]

const normalizedPoints = computed(() => {
  if (props.points.length === 0) {
    return []
  }

  const chartHeight = 56
  const chartTop = 4
  const chartBottom = chartHeight - 4
  const minValue = 20
  const maxValue = 100
  const range = maxValue - minValue

  return props.points.map((point, index) => {
    const x = props.points.length === 1 ? 50 : (index * 100) / (props.points.length - 1)
    const clampedValue = Math.min(maxValue, Math.max(minValue, point.value))
    const progress = (clampedValue - minValue) / range
    const y = chartBottom - progress * (chartBottom - chartTop)

    return { x, y }
  })
})

const linePoints = computed(() => normalizedPoints.value.map(({ x, y }) => `${x},${y}`).join(' '))

const areaPath = computed(() => {
  const points = normalizedPoints.value

  if (points.length === 0) {
    return ''
  }

  const lineSegment = points.map(({ x, y }) => `L ${x} ${y}`).join(' ')
  const first = points[0]
  const last = points[points.length - 1]

  return `M ${first.x} ${first.y} ${lineSegment} L ${last.x} 56 L ${first.x} 56 Z`
})
</script>

<template>
  <article class="bg-card border-stroke flex h-full flex-col rounded-[14px] border p-6">
    <p class="text-fg-muted">{{ props.title }}</p>

    <div class="mt-5 flex flex-1 gap-5">
      <ul class="text-fg-muted flex flex-col justify-between py-1 text-xs">
        <li v-for="tick in yTicks" :key="tick">{{ tick }}%</li>
      </ul>

      <div class="flex flex-1 flex-col">
        <svg viewBox="0 0 100 56" preserveAspectRatio="none" class="h-40 w-full xl:h-44">
          <defs>
            <linearGradient id="precipitation-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#66FFCC" stop-opacity="0.36" />
              <stop offset="100%" stop-color="#66FFCC" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path :d="areaPath" fill="url(#precipitation-fill)" />
          <polyline
            :points="linePoints"
            fill="none"
            stroke="#66FFCC"
            stroke-width="0.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <ul
          class="text-fg-muted mt-3 grid text-xs"
          :style="{ gridTemplateColumns: `repeat(${props.points.length}, minmax(0, 1fr))` }"
        >
          <li v-for="point in props.points" :key="point.label" class="text-center">{{ point.label }}</li>
        </ul>
      </div>
    </div>
  </article>
</template>

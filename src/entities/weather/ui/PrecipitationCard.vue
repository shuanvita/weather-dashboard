<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { init, use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent, TooltipComponent, type GridComponentOption, type TooltipComponentOption } from 'echarts/components'
import { LineChart, type LineSeriesOption } from 'echarts/charts'
import type { ECharts, ComposeOption } from 'echarts/core'

use([CanvasRenderer, GridComponent, TooltipComponent, LineChart])

type EChartsOption = ComposeOption<GridComponentOption | TooltipComponentOption | LineSeriesOption>

type PrecipitationPoint = {
  label: string
  value: number
}

const props = defineProps<{
  title: string
  points: PrecipitationPoint[]
}>()

const chartElementRef = ref<HTMLElement | null>(null)
let chart: ECharts | null = null

const buildOptions = (): EChartsOption => ({
  grid: {
    left: 30,
    right: 8,
    top: 8,
    bottom: 28,
    containLabel: false,
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#0f141d',
    borderColor: '#223047',
    textStyle: {
      color: '#f3f6fb',
    },
    formatter: (params: unknown) => {
      const firstPoint = Array.isArray(params) ? params[0] : null

      if (!firstPoint || typeof firstPoint !== 'object') {
        return ''
      }

      const point = firstPoint as { axisValueLabel?: string; data?: number }
      return `${point.axisValueLabel ?? ''}: ${point.data ?? 0}%`
    },
  },
  xAxis: {
    type: 'category',
    data: props.points.map((point) => point.label),
    boundaryGap: false,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#93A4BD',
      fontSize: 12,
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 100,
    interval: 25,
    axisLine: { show: false },
    splitLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#93A4BD',
      fontSize: 12,
      formatter: '{value}%',
    },
  },
  series: [
    {
      type: 'line',
      data: props.points.map((point) => point.value),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        color: '#66FFCC',
        width: 2,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(102, 255, 204, 0.36)' },
            { offset: 1, color: 'rgba(102, 255, 204, 0)' },
          ],
        },
      },
    },
  ],
})

const renderChart = () => {
  if (!chart) {
    return
  }

  chart.setOption(buildOptions(), true)
}

const resizeChart = () => {
  chart?.resize()
}

onMounted(() => {
  if (!chartElementRef.value) {
    return
  }

  chart = init(chartElementRef.value)
  renderChart()
  window.addEventListener('resize', resizeChart)
})

watch(
  () => props.points,
  () => {
    renderChart()
  },
  { deep: true }
)

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chart?.dispose()
  chart = null
})
</script>

<template>
  <article class="bg-card border-stroke flex h-full flex-col rounded-[14px] border p-6">
    <p class="text-fg-muted">{{ props.title }}</p>
    <div ref="chartElementRef" class="mt-5 h-44 w-full xl:h-48" />
  </article>
</template>

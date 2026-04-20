<script setup lang="ts">
type OverviewTab = 'today' | 'week'

const props = withDefaults(
  defineProps<{
    modelValue?: OverviewTab
  }>(),
  {
    modelValue: 'week',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: OverviewTab): void
}>()

const tabs: { label: string; value: OverviewTab }[] = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
]

const selectTab = (tab: OverviewTab) => {
  emit('update:modelValue', tab)
}
</script>

<template>
  <div class="text-size-title flex items-center gap-6 xl:gap-8 font-medium" role="tablist" aria-label="Overview period">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      role="tab"
      class="cursor-pointer transition-colors"
      :class="
        props.modelValue === tab.value
          ? 'text-fg underline decoration-wavy decoration-1 underline-offset-6'
          : 'text-fg-muted hover:text-fg'
      "
      :aria-selected="props.modelValue === tab.value"
      @click="selectTab(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

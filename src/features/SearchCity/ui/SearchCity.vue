<script setup lang="ts">
import { ref, watch } from 'vue'
import { VSvg } from '@/shared/ui/VSvg'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    isLoading?: boolean
    error?: string | null
  }>(),
  {
    modelValue: 'Moscow',
    isLoading: false,
    error: null,
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'submit', value: string): void
}>()

const city = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    city.value = value
  }
)

const onSubmit = () => {
  const normalizedCity = city.value.trim() || 'Moscow'
  city.value = normalizedCity
  emit('update:modelValue', normalizedCity)
  emit('submit', normalizedCity)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <form
      @submit.prevent="onSubmit"
      role="search"
      class="bg-card border-stroke flex items-center gap-3 rounded-full border px-4 py-2.5 xl:px-5 xl:py-3"
    >
      <button
        class="text-fg-muted hover:text-fg cursor-pointer"
        type="submit"
        :disabled="props.isLoading"
        aria-label="Search city"
      >
        <VSvg class="pointer-events-none" icon="search" :size="20" />
      </button>
      <input
        name="search"
        class="placeholder:text-fg-muted focus-visible:outline-none"
        type="text"
        placeholder="Search city..."
        :disabled="props.isLoading"
        v-model="city"
        @change="emit('update:modelValue', city)"
      />
    </form>
    <p v-if="props.error" class="text-xs text-[#F5B544]">
      {{ props.error }}
    </p>
  </div>
</template>

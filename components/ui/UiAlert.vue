<script setup lang="ts">
import type { AlertVariant } from '@/types/ui'

withDefaults(defineProps<{
  variant?: AlertVariant
  title?: string
  dismissible?: boolean
}>(), {
  variant: 'info',
  dismissible: false,
})

const emit = defineEmits<{
  dismiss: []
}>()

const isVisible = ref<boolean>(true)

function dismiss(): void {
  isVisible.value = false
  emit('dismiss')
}

interface VariantConfig {
  wrapper: string
  icon: string
  title: string
  body: string
  path: string
}

const variantConfig: Record<AlertVariant, VariantConfig> = {
  success: {
    wrapper: 'bg-emerald-50 border-emerald-200',
    icon: 'text-emerald-500',
    title: 'text-emerald-800',
    body: 'text-emerald-700',
    path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    wrapper: 'bg-amber-50 border-amber-200',
    icon: 'text-amber-500',
    title: 'text-amber-800',
    body: 'text-amber-700',
    path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  danger: {
    wrapper: 'bg-red-50 border-red-200',
    icon: 'text-red-500',
    title: 'text-red-800',
    body: 'text-red-700',
    path: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  info: {
    wrapper: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    body: 'text-blue-700',
    path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-150"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      :class="['flex gap-3 rounded-xl border p-4', variantConfig[variant].wrapper]"
      role="alert"
    >
      <svg
        :class="['mt-0.5 h-5 w-5 shrink-0', variantConfig[variant].icon]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" :d="variantConfig[variant].path" />
      </svg>

      <div class="flex-1 text-sm">
        <p v-if="title" :class="['font-semibold', variantConfig[variant].title]">{{ title }}</p>
        <div :class="[variantConfig[variant].body, title ? 'mt-1' : '']">
          <slot />
        </div>
      </div>

      <button
        v-if="dismissible"
        :class="['shrink-0 rounded p-0.5 transition-colors', variantConfig[variant].icon, 'hover:opacity-70']"
        aria-label="關閉"
        @click="dismiss"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ButtonVariant, ButtonSize } from '@/types/ui'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
  block: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses: Record<ButtonVariant, string> = {
  brand: 'bg-[#ffadc4] text-white hover:bg-pink-400 focus:ring-pink-300 disabled:bg-pink-200',
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 disabled:bg-emerald-300',
  secondary: 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500 disabled:bg-slate-300',
  outline: 'border border-emerald-600 text-emerald-600 bg-transparent hover:bg-emerald-50 focus:ring-emerald-500 disabled:border-emerald-300 disabled:text-emerald-300',
  ghost: 'text-slate-600 bg-transparent hover:bg-slate-100 focus:ring-slate-400 disabled:text-slate-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
}

function handleClick(event: MouseEvent): void {
  if (!props.loading && !props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-colors duration-150',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:cursor-not-allowed',
      variantClasses[variant],
      sizeClasses[size],
      block ? 'w-full' : '',
    ]"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin"
      :class="size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { BadgeVariant, BadgeSize } from '@/types/ui'

withDefaults(defineProps<{
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
}>(), {
  variant: 'default',
  size: 'md',
  dot: false,
})

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
}

const dotClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs rounded',
  md: 'px-2.5 py-1 text-xs rounded-md',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 font-medium',
      variantClasses[variant],
      sizeClasses[size],
    ]"
  >
    <span
      v-if="dot"
      :class="['h-1.5 w-1.5 rounded-full', dotClasses[variant]]"
    />
    <slot />
  </span>
</template>

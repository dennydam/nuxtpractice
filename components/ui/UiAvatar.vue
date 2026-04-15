<script setup lang="ts">
import type { AvatarSize } from '@/types/ui'

const props = withDefaults(defineProps<{
  src?: string
  name?: string
  size?: AvatarSize
  shape?: 'circle' | 'square'
}>(), {
  size: 'md',
  shape: 'circle',
})

const imgError = ref<boolean>(false)

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
}

const shapeClass = computed<string>(() => props.shape === 'circle' ? 'rounded-full' : 'rounded-lg')

const initials = computed<string>(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const colorIndex = computed<number>(() => {
  if (!props.name) return 0
  return props.name.charCodeAt(0) % PALETTE.length
})

const PALETTE = [
  'bg-rose-400 text-white',
  'bg-orange-400 text-white',
  'bg-amber-400 text-white',
  'bg-emerald-500 text-white',
  'bg-teal-500 text-white',
  'bg-blue-500 text-white',
  'bg-violet-500 text-white',
  'bg-pink-500 text-white',
]

function handleError(): void {
  imgError.value = true
}
</script>

<template>
  <div
    :class="[
      'inline-flex shrink-0 items-center justify-center overflow-hidden font-semibold',
      sizeClasses[size],
      shapeClass,
    ]"
  >
    <img
      v-if="src && !imgError"
      :src="src"
      :alt="name ?? 'avatar'"
      class="h-full w-full object-cover"
      @error="handleError"
    />
    <span
      v-else
      :class="['flex h-full w-full items-center justify-center', PALETTE[colorIndex]]"
    >
      {{ initials }}
    </span>
  </div>
</template>

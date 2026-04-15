<script setup lang="ts">
withDefaults(defineProps<{
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
  hoverable?: boolean
}>(), {
  shadow: 'md',
  padding: 'md',
  border: true,
  hoverable: false,
})

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}
</script>

<template>
  <div
    :class="[
      'rounded-xl bg-white',
      shadowClasses[shadow],
      border ? 'border border-slate-200' : '',
      hoverable ? 'transition-shadow duration-200 hover:shadow-lg cursor-pointer' : '',
    ]"
  >
    <div
      v-if="$slots.header"
      class="border-b border-slate-100 px-5 py-4"
    >
      <slot name="header" />
    </div>

    <div :class="padding !== 'none' ? paddingClasses[padding] : ''">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="border-t border-slate-100 px-5 py-4"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

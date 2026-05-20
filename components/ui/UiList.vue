<script setup lang="ts" generic="T">
withDefaults(defineProps<{
  items: readonly T[]
  divided?: boolean
}>(), {
  divided: true,
})

defineSlots<{
  default(props: { item: T; index: number }): unknown
  empty(): unknown
}>()
</script>

<template>
  <div class="w-full">
    <template v-if="items.length > 0">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="divided && index > 0 ? 'border-t border-slate-100' : ''"
      >
        <slot :item="item" :index="index" />
      </div>
    </template>

    <div v-else class="py-12 text-center">
      <slot name="empty">
        <p class="text-sm text-slate-400">沒有資料</p>
      </slot>
    </div>
  </div>
</template>

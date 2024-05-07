<template>
  <div class="flex flex-wrap  justify-around">
    <div
      v-for="item in productData"
      :key="item.id"
      class="my-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Noteworthy technology acquisitions 2021
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <button
        @click="$emit('selectItem', item)"
        type="button"
        class="text-gray-900 bg-[#ffadc4] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Select
      </button>

      <div class="flex" @click="toggleExpand">
        <span>read more....</span>
        <transition name="rotate">
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 8"
            :style="{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.5s'
            }"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
            />
          </svg>
        </transition>
      </div>
      <div v-if="isExpanded">領域展開</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import type { ProductData } from '@/utils/types'

const productData = ref<ProductData[]>([
  {
    id: 1,
    title: 'Noteworthy technology acquisitions 2021',
    price:100,
    content: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    // chooseItem: '',
  },
  {
    id: 2,
    title: 'Noteworthy technology acquisitions 2022',
    price:150,
    content: 'Here are the biggest enterprise technology acquisitions of 2022 so far, in reverse chronological order.',
  },
  {
    id: 3,
    title: 'Noteworthy technology acquisitions 2022',
    price:200,
    content: 'Here are the biggest enterprise technology acquisitions of 2022 so far, in reverse chronological order.',
  },
])
// const tableData = ref<TableDataItem[]>([])

const emit = defineEmits<{
  (e: 'selectTime', id: number): void
  (e: 'update', value: string): void
}>()
// const emit = defineEmits<{
//   change: [id: number] // 具名元组语法
//   update: [value: string]
// }>()

const isExpanded = ref(false)
const chooseItem = ref()

const selectItem = () => {
  console.log('666')
  chooseItem.value = '333'
}
const toggleExpand = () => {
  console.log('777')
  isExpanded.value = !isExpanded.value
}
// import { ChevronDownIcon } from '@heroicons/vue/20/solid'
</script>
<style>
.rotate-enter-active,
.rotate-leave-active {
  transition: transform 2s;
}
</style>

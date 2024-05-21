<template>
  <div class="flex flex-wrap  justify-bewteen" style="">
    <div
      v-for="(item, index) in productData"
      :key="item.id"
      class="my-2 mx-2 max-w-sm p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ item.title }}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ item.content }}
      </p>
      <button
        @click="$emit('selectItem', item)"
        type="button"
        class="text-gray-900 bg-[#ffadc4] border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Select
      </button>

      <div class="flex hover:text-gray-600 " @click="toggleExpand(index)">
        <span>read more....</span>
        <transition name="rotate">
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 8"
            :style="{
              transform: isExpanded[index] ? 'rotate(180deg)' : 'rotate(0deg)',
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
      <div v-if="isExpanded[index]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
        cupiditate veritatis nulla, atque explicabo, iste neque nesciunt non qui
        odit minus dolor quae soluta deleniti architecto alias eaque culpa quas.
      </div>
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
    content: ' in reverse chronological order.',
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
    content: ' in reverse chronological order.',
  },
])

const emit = defineEmits<{
  (e: 'selectTime', id: number): void
  (e: 'update', value: string): void
}>()
// const emit = defineEmits<{
//   change: [id: number] // 具名元组语法
//   update: [value: string]
// }>()

 const isExpanded = ref(Array(productData.length).fill(false));
const chooseItem = ref()
function showItem(){
  console.log('showIttem')
}

const selectItem = () => {
  console.log('666')
  chooseItem.value = '333'
}
const toggleExpand = (index) => {
  console.log('777')
  isExpanded.value[index] =!isExpanded.value[index]
    // this.$set(this.isExpanded, index, !this.isExpanded[index]);
}
</script>
<style>
.rotate-enter-active,
.rotate-leave-active {
  transition: transform 2s;
}
</style>

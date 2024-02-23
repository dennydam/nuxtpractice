<template>
  <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    </p>
    <button
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
          :style="{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.5s' }"
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
      <!-- <transition name="rotate">
          <svg
            v-if="isExpanded"
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 8"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
            />
          </svg>
        </transition> -->
    </div>
    <!-- 按鈕內容 -->
    <div v-if="isExpanded">領域展開</div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
const isExpanded = ref(false)

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

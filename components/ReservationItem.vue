<template>
     <div class="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Featured Collection
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard
            v-for="(item, index) in productData"
            :key="item.id"
            padding="none"
            shadow="sm"
            class="group flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <!-- Card Content -->
            <div class="p-8 flex-1">
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 text-xs font-semibold text-pink-600 bg-pink-50 rounded-full">New</span>
              </div>
              
              <a href="#" class="block group-hover:text-pink-600 transition-colors duration-200">
                <h5 class="text-xl font-bold tracking-tight text-gray-900 mb-3">
                  {{ item.title }}
                </h5>
              </a>
              
              <p class="font-normal text-gray-500 leading-relaxed mb-4">
                {{ item.content }}
              </p>

              <!-- Expanded Details -->
              <div 
                class="overflow-hidden transition-all duration-500 ease-in-out"
                :style="{ maxHeight: isExpanded[index] ? '200px' : '0px', opacity: isExpanded[index] ? '1' : '0' }"
              >
                <div class="pt-4 mt-2 border-t border-gray-100 text-sm text-gray-600 italic bg-gray-50/50 -mx-8 px-8 py-4">
                  {{ item.details }}
                </div>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
              <UiButton variant="brand" size="sm" @click="selectItem(item)">
                Select
              </UiButton>

              <UiButton variant="ghost" size="sm" @click="toggleExpand(index)">
                {{ isExpanded[index] ? 'Read less' : 'Read more' }}
                <svg
                  class="h-4 w-4 transition-transform duration-300"
                  :class="{ 'rotate-180': isExpanded[index] }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </UiButton>
            </div>
          </UiCard>
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

const selectItem = () :void =>{
  console.log('666')
  chooseItem.value = '333'
}
const toggleExpand = (index:number) => {
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


<template>
  <!-- Step Tabs -->
  <nav aria-label="Steps" class="mt-10 mb-8 border-b border-slate-200 pb-6">
    <ul class="flex justify-center gap-4 flex-wrap text-sm font-medium">
      <!-- Step 1 -->
      <li>
        <div
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500 text-white shadow-sm shadow-pink-500/40"
        >
          <span
            class="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold"
          >
            1
          </span>
          <span class="text-sm tracking-wide">Select Service</span>
        </div>
      </li>

      <!-- Step 2 -->
      <li>
        <div
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-400 cursor-not-allowed"
        >
          <span
            class="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold"
          >
            2
          </span>
          <span class="text-sm tracking-wide">Select Time</span>
        </div>
      </li>
    </ul>
  </nav>

  <!-- Main Section -->
  <section
    class="min-h-screen py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Title Area -->
      <div class="text-center mb-12">
        <p class="text-xs uppercase tracking-[0.2em] text-pink-500 mb-3">
          Featured Collection
        </p>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          Choose the service that fits you
        </h2>
        <p class="max-w-2xl mx-auto text-sm sm:text-base text-slate-500">
          Curated services carefully crafted for different needs. Click
          <span class="font-semibold text-pink-500">“Read more”</span>
          to see details, then select your favorite to proceed.
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <UiCard
          v-for="(item, index) in productData"
          :key="item.id"
          padding="none"
          shadow="sm"
          class="group flex flex-col overflow-hidden hover:shadow-xl hover:border-pink-400/60 hover:-translate-y-1.5 transition-all duration-300"
        >
          <!-- Card Content -->
          <div class="p-7 sm:p-8 flex-1">
            <!-- Top row: badge + optional tag -->
            <div class="flex items-center justify-between mb-4">
              <span
                class="px-3 py-1 text-[11px] font-semibold text-pink-600 bg-pink-50 rounded-full border border-pink-100"
              >
                New
              </span>

              <span
                class="text-xs text-slate-400 inline-flex items-center gap-1"
                v-if="item.tag"
              >
                <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                {{ item.tag }}
              </span>
            </div>

            <!-- Title -->
            <button
              type="button"
              class="block text-left group-hover:text-pink-600 transition-colors duration-200"
              @click="toggleExpand(index)"
            >
              <h5 class="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 mb-2">
                {{ item.title }}
              </h5>
            </button>

            <!-- Short description -->
            <p class="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
              {{ item.content }}
            </p>

            <!-- Meta info (可選：價格 / 時長 / 等級，有就顯示) -->
            <div class="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-1">
              <span v-if="item.duration" class="inline-flex items-center gap-1">
                <svg
                  class="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.6"
                    d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ item.duration }}
              </span>

              <span v-if="item.level" class="inline-flex items-center gap-1">
                <svg
                  class="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.6"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.113 3.418a1 1 0 00.95.69h3.594c.969 0 1.371 1.24.588 1.81l-2.907 2.112a1 1 0 00-.364 1.118l1.113 3.418c.3.921-.755 1.688-1.54 1.118l-2.907-2.112a1 1 0 00-1.176 0l-2.907 2.112c-.784.57-1.838-.197-1.539-1.118l1.112-3.418a1 1 0 00-.363-1.118L4.804 8.845c-.783-.57-.38-1.81.588-1.81h3.594a1 1 0 00.95-.69l1.113-3.418z"
                  />
                </svg>
                {{ item.level }}
              </span>

              <span
                v-if="item.price"
                class="ml-auto text-sm font-semibold text-pink-600"
              >
                ${{ item.price }}
              </span>
            </div>

            <!-- Expanded Details -->
            <div
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{
                maxHeight: isExpanded[index] ? '220px' : '0px',
                opacity: isExpanded[index] ? '1' : '0'
              }"
            >
              <div
                class="pt-4 mt-3 border-t border-slate-100 text-sm text-slate-600 bg-slate-50 -mx-7 sm:-mx-8 px-7 sm:px-8 py-4 rounded-b-2xl"
              >
                {{ item.details }}
              </div>
            </div>
          </div>

          <!-- Card Actions -->
          <div
            class="px-7 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4"
          >
            <UiButton variant="brand" size="sm" @click="selectService(item.id)">
              Select
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M19 9l-7 7-7-7" />
              </svg>
            </UiButton>
          </div>
        </UiCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

// 定義資料介面
interface ProductData {
  id: number
  title: string
  price?: number
  content: string
  details?: string
  tag?: string
  duration?: string
  level?: string
}

// 模擬資料
const productData = ref<ProductData[]>([
  {
    id: 1,
    title: 'Noteworthy technology acquisitions 2021',
    price: 100,
    content: 'Details about 2021 acquisitions...',
    details: 'A more detailed description of 2021 acquisitions, including key players, pricing and impact.',
    tag: 'Business',
    duration: '60 mins',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Noteworthy technology acquisitions 2022',
    price: 150,
    content: 'Here are the biggest enterprise technology acquisitions of 2022.',
    details: 'We highlight the most important deals that reshaped the enterprise technology landscape.',
    tag: 'Enterprise',
    duration: '45 mins',
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'Future Tech 2023',
    price: 200,
    content: 'Upcoming technology trends.',
    details: 'Explore AI, Web3, and other disruptive trends that will define the next decade.',
    tag: 'Future',
    duration: '90 mins',
    level: 'Advanced'
  }
])

const isExpanded = ref<boolean[]>(new Array(productData.value.length).fill(false))

const toggleExpand = (index: number) => {
  isExpanded.value[index] = !isExpanded.value[index]
}

// 處理跳轉
const selectService = (id: number) => {
  // Nuxt 3 路由跳轉，將 ID 帶入 URL
  navigateTo(`/reservation/${id}`)
}

</script>






<template>
  <div>
    <nav class="backdrop-blur bg-white/30 shadow-md">
      <div class="mx-auto  px-2 sm:px-6 ">
        <div class="relative flex h-20 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              @click="toggle"
              type="button"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>

              <svg
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex items-center">
              <img
                class="test-bg h-10 w-auto"
                src="https://simplebeautydemo.simplybook.it/uploads/simplebeautydemo/image_files/preview/4cb105295be36fed171b08ac985d36c9.png"
                alt="Your Image"
              />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a
                  @click="goReservationPage"
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >Service</a
                >
                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >Projects</a
                >
                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >Calendar</a
                >
              </div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 notification-button"
          >
            <button
              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              @click="toggleModal"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
            <span class="notification-badge">3</span>

            <!-- Profile dropdown -->
            <div class="relative ml-3"></div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div
        class="sm:hidden"
        :class="open ? 'block' : 'hidden'"
        id="mobile-menu"
      >
        <div class="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
            >Dashboard</a
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >Service</a
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >Projects</a
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >Calendar</a
          >
        </div>
      </div>
    </nav>

    <section
      class=""
      style="
        height: 500px;
        background-image: url(/towfiqu-barbhuiya-jbjmimlaC-U-unsplash.jpg);
        background-size: cover;
        background-position: center;
      "
    ></section>
    <!-- background-image: url(/uploads/simplebeautydemo/image_files/background/0fbed59ed6ab3bacd565f376b50746f1.jpg); background-size: cover;background-position: center; -->

    <slot />
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <!-- 視窗內容 -->
      <div class="bg-white p-8 rounded-md shadow-lg">
        <!-- 視窗標題 -->
        <h2 class="text-lg font-semibold mb-4">您的預約</h2>
        <!-- 視窗內容 -->
        <p class="text-gray-700">
          您有 {{ userAppointmentData.length }} 筆預約.
        </p>
        <!-- 列出所有預約項 -->
        <div v-for="item in userAppointmentData" :key="item.id" class="mb-4">
          <!-- 預約項目 -->
          <h3 class="text-gray-700">{{ item.treatment }}</h3>
          <div class="flex  items-center ">
            <p class="text-gray-700">預約時間: {{ item.appointmentTime }}</p>
            <button
              type="button"
              @click="deleteAppointment(item)"
              class="ml-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <div style="width:15px;height:15px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  class="humbleicons hi-trash"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 6l.934 13.071A1 1 0 007.93 20h8.138a1 1 0 00.997-.929L18 6m-6 5v4m8-9H4m4.5 0l.544-1.632A2 2 0 0110.941 3h2.117a2 2 0 011.898 1.368L15.5 6"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
        <!-- 關閉按鈕 -->
        <div class="flex">
          <button
            type="button"
            @click="toggleModal"
            class="ml-auto mt-4 bg-[#ffadc4] text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- 彈出視窗 -->
    <ReservationItem v-if="noshow" @showItem="showItem" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const noshow = false

const { $notify }: any = useNuxtApp()
const userStore = useUserStore()
let userAppointmentData = computed(() => userStore.userReservation)
console.log('userStore', userStore.sta)

const open = ref(false)

const isModalOpen = ref(false)

function goReservationPage() {
  router.push({ path: '/reservation' })
}
function toggleModal() {
  isModalOpen.value = !isModalOpen.value
}

function toggle() {
  console.log('toogle')
  open.value = !open.value
}

function deleteAppointment(item) {
  const appointmentId = item.id
  const { data: response, error } = useAsyncData(async () => {
    try {
      const { data } = await useFetch('/api/appointment/', {
        method: 'DELETE',
        body: {
          appointmentId: appointmentId
        }
      })
      $notify({
        type: 'success',
        title: '刪除成功',
        text: 'Delete Success'
      })
      const userStore = useUserStore()
      userStore.deleteAppointment(appointmentId)

      // console.log('deleteData', data)
    } catch (error) {
      console.error('An error occurred:', error)
      return null
    }
  })
}
async function getAppointment() {
  const userStore = useUserStore()

  console.log('userState', userStore.profile.id)
  const userId = userStore.profile.id
  await userStore.googleLogin()

  userStore.getAppointment()
}
onMounted(async () => {
  await getAppointment()
})
</script>
<style>
.test-bg {
  background: none !important;
  background-color: transparent !important;
}

/* 按鈕的父級容器 */
.notification-button {
  position: relative; /* 設置為相對定位 */
}

/* 通知數量提醒的樣式 */
.notification-badge {
  position: absolute; /* 設置為絕對定位 */
  top: -6px; /* 從上方偏移 */
  right: -2px; /* 從右側偏移 */
  background-color: red; /* 背景顏色 */
  color: white; /* 文字顏色 */
  border-radius: 999px; /* 圓形邊框半徑 */
  width: 20px; /* 寬度 */
  height: 20px; /* 高度 */
  font-size: 12px; /* 文字大小 */
  display: flex; /* 設置為彈性盒子，使內容居中 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>

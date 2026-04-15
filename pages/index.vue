<template>
  <!-- 背景：使用 min-h-screen 確保佔滿全螢幕，並加入柔和漸層 -->
  <div class="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-gray-100">
    
    <!-- 標題區塊 -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex flex-col items-center">
        <!-- Logo 預留位置 (如果您有 Logo 可以取消註解) -->
        <NuxtLink to="/" class="mb-4 transition hover:opacity-80">
          <!-- <Icon name="logos:nuxt-icon" size="64" /> -->
           <!-- 暫時用一個 Emoji 代替 Logo 展示效果 -->
           <span class="text-4xl">🔐</span>
        </NuxtLink>
        
        <h2 class="mt-2 text-center text-3xl font-extrabold tracking-tight text-slate-900">
          登入您的帳號
        </h2>
        <p class="mt-2 text-center text-sm text-slate-600">
          歡迎回來，請選擇下方方式繼續
        </p>
      </div>
    </div>

    <!-- 卡片區塊 -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <!-- 卡片本體：白色背景、大圓角、深陰影 -->
      <UiCard shadow="lg" padding="lg">
        
        <div class="flex flex-col space-y-6">
          <!-- Google 登入按鈕 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-4 text-center">
              第三方快速登入
            </label>
            
            <button
              type="button"
              class="group relative flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              @click="handleGoogleLogin"
            >
              <!-- Icon 容器 -->
              <div class="mr-3 flex h-5 w-5 items-center justify-center">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                  </g>
                </svg>
              </div>
              <span class="text-gray-600 font-bold group-hover:text-gray-900">
                使用 Google 帳號繼續
              </span>
            </button>
          </div>

          <!-- 分隔線 (可選) -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">安全由 Google 保護</span>
            </div>
          </div>
          
        </div>
      </UiCard>

      <!-- 底部連結 -->
      <p class="mt-6 text-center text-xs text-gray-500">
        登入即代表您同意
        <a href="#" class="font-medium text-emerald-600 hover:text-emerald-500">服務條款</a>
        與
        <a href="#" class="font-medium text-emerald-600 hover:text-emerald-500">隱私權政策</a>
      </p>
    </div>
  </div>

  <div class="relative inline-block text-left">
    <!-- <div>
      <button
        type="button"
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        Options
        <svg
          class="-mr-1 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div> -->

    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <div
      class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
          >Account settings</a
        >
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="menu-item-1"
          >Support</a
        >
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="menu-item-2"
          >License</a
        >
        <form method="POST" action="#" role="none">
          <button
            type="submit"
            class="text-gray-700 block w-full px-4 py-2 text-left text-sm"
            role="menuitem"
            tabindex="-1"
            id="menu-item-3"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

import { googleTokenLogin } from 'vue3-google-login'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

// const { push: pushNotify } = useNotification()
const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public
// const userStore = useUserStore()
const router = useRouter()
const loginData = reactive({
  email: '',
  password: ''
})

const handleGoogleLogin = async () => {
  const accessToken = await googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then(response => response?.access_token)

  if (!accessToken) {
    return '登入失敗'
  }

  const { profileData, error } = await userStore.googleLogin({
    accessToken
  })
   console.log('會員資料', profileData)

  if (profileData) {
    router.push({ path: '/reservation' })
    // navigateTo(route.query.redirect_to ?? '/')
  } else {
    navigateTo(route.query.redirect_to ?? '/')
  }
}


</script>


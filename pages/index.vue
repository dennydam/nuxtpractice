<template>
  <div
    class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md">
      <div class="flex flex-col items-center">
        <NuxtLink to="/">
          <!-- <Icon name="logos:nuxt-icon" size="80" /> -->
        </NuxtLink>
        <h2
          class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700"
        >
          登入帳號
        </h2>
      </div>
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <!-- <form class="space-y-6" @submit.prevent="handleEmailLogin">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700"
                >電子信箱</label
              >
              <div class="mt-1">
                <input
                  id="email"
                  v-model="loginData.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
                >密碼</label
              >
              <div class="mt-1">
                <input
                  id="password"
                  v-model="loginData.password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                登入
              </button>
            </div>
          </form> -->

          <!-- <div class="my-4 flex items-center backdrop:relative">
            <div class="flex-grow border-t border-gray-200"></div>
            <span class="mx-4 flex-shrink text-gray-300">或</span>
            <div class="flex-grow border-t border-gray-200"></div>
          </div> -->

          <div class="flex flex-col space-y-2">
            <button
              type="button"
              class="group relative flex w-full justify-center rounded-md border border-gray-100 bg-white py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              @click="handleGoogleLogin"
            >
              <div class="mx-2 flex items-center pl-3">
                <svg
                  class="mx-auto h-5 w-5"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                </svg>
              </div>
              <span class="text-slate-500 group-hover:text-slate-600"
                >使用 Google 繼續</span
              >
            </button>
            <!-- <button
              type="button"
              class="group relative flex w-full justify-center rounded-md border border-gray-100 bg-white py-2 px-4 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              @click="
                navigateTo({
                  path: '/register',
                  query: { redirect_to: $route.query.redirect_to }
                })
              "
            >
              <span class="text-slate-500 group-hover:text-slate-600"
                >使用電子信箱註冊</span
              >
            </button> -->
          </div>
        </div>
      </div>
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
  // console.log('會員資料', profileData)

  if (profileData) {
    router.push({ path: '/reservation' })
    // navigateTo(route.query.redirect_to ?? '/')
  } else {
    navigateTo(route.query.redirect_to ?? '/')
  }
}

// definePageMeta({
//   layout: false,
//   middleware: 'logged-in-redirect',
// })
</script>

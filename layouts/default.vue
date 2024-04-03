<template>
  <div>
    <nav class="backdrop-blur bg-white/30 shadow-md">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
              <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
              <svg
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
              <!-- <svg
              class="hidden h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
                transform="rotate(45 12 12)"
              />
            </svg> -->
            </button>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex items-center">
              <img
                class="test-bg h-10 w-auto"
                src="https://simplebeautydemo.simplybook.it/uploads/simplebeautydemo/image_files/preview/4cb105295be36fed171b08ac985d36c9.png"
                alt="Your Image"
              />

              <!-- <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              /> -->
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <!-- <a href="#" class="text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a> -->
                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >Team</a
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
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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

            <!-- Profile dropdown -->
            <div class="relative ml-3"></div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="sm:hidden" :class="open ? 'block' : 'hidden'" id="mobile-menu">
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
            >Team</a
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
    <!-- <div class="img-container" style="height: 50%">
      <img class="img-fluid" src="../public/towfiqu-barbhuiya-jbjmimlaC-U-unsplash.jpg" alt="Your Image" />
    </div> -->
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
  </div>
</template>
<script setup>
const open = ref(false)

function toggle() {
  console.log('toogle')
  open.value = !open.value
}
</script>
<style>
.img-container img {
  max-width: 100%; /* 限制圖片的最大寬度為容器的寬度 */
  height: auto; /* 讓圖片高度自適應寬度，從而保持等比例放大縮小 */
  max-height: 100%; /* 限制圖片的最大高度為容器的高度 */
}

.test-bg {
  background: none !important;
  background-color: transparent !important;
}
</style>

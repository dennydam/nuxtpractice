<template>
  <!-- <nav class="">
    <ul>
      <li><NuxtLink to="/about">About</NuxtLink></li>
    </ul>
  </nav> -->
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <!-- <CustomLoadingIndicator /> -->
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup lang="ts">
const open = ref(false)
// const { pending, data: posts } = useFetch('/api/posts', {
//   lazy: true,
// })
function toggle() {
  console.log('toogle')
  open.value = !open.value
}
</script>
<style>
.test-bg {
  background: none !important;
  background-color: transparent !important;
}
</style>

<template>
  <!-- <nav class="">
    <ul>
      <li><NuxtLink to="/about">About</NuxtLink></li>
    </ul>
  </nav> -->
  <notifications />
  <div v-if="isLoading2" class="loading-container">
    <div>{{ isLoading }}</div>
    <div class="loading-spinner"></div>
  </div>

  <NuxtLoadingIndicator />
  <NuxtLayout>
    <!-- <CustomLoadingIndicator /> -->
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { provide, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/stores/index'

const open = ref(false)
const { isLoading } = storeToRefs(useLoadingStore())

const isLoading2 = computed(() => isLoading.value)
</script>
<style>
.test-bg {
  background: none !important;
  background-color: transparent !important;
}
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent; /* 将背景设为透明 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script setup lang="ts">
const { data } = await useFetch('/server/api/hello')
console.log('data', data)
async function testApi() {
  const { data } = await useFetch('/server/api/hello')
  console.log('data', data)
}

onMounted(() => {})
</script>

<template>
  <div>
    <button @click="testApi">testApi</button>
  </div>
  <!-- <pre>{{ data }}</pre> -->
</template>

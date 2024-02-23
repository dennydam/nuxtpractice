<script setup lang="ts">
const { data } = await useFetch('/server/api/hello')
// console.log('data', data)

async function testApi() {
  const { data } = await useFetch('/api/hello')
  //  const { data, error } = await useFetch('/api/auth/google-auth-token', {
  //   method: 'POST',
  //   body: loginrData,
  // })
  console.log('data', data)
}

onMounted(() => {})
</script>

<template>
  <div>
    <button @click="testApi">testApi</button>
  </div>
</template>

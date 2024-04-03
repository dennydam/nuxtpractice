<script setup lang="ts">
const { data } = await useFetch('/server/api/hello')
// console.log('data', data)
import { useUserStore } from '@/stores/user'
const user = useUserStore()

async function testApi() {
  const { data } = await useFetch('/api/hello')
  //  const { data, error } = await useFetch('/api/auth/google-auth-token', {
  //   method: 'POST',
  //   body: loginrData,
  // })

  console.log('data', data)
}

async function appTest() {
  console.log('appTest')
  //寫一個appointment的api
  // const { data, error } = await useFetch('/api/auth/google-auth-token', {
  //   method: 'POST',
  //   body: loginrData,
  // })
  console.log('userStore', JSON.parse(JSON.stringify(user)))
  const { data } = await useFetch('/api/appointment/', {
    method: 'POST',
    body: {
      name: 'test',
      time: '2022-10-10 10:10:10',
    },
  })
  if (data.value) {
    console.log('data', data.value)
  }
  // console.log('appdata', data)
}

async function getApppTest() {
  console.log('appTest')

  const { data, error } = await useFetch('/api/appointment')
  if (error) {
    console.log('error', error.value)
  }
  if (data.value) {
    console.log('data', data.value)
  }
  // console.log('appdata', data)
}
async function deleteAppTest() {
  console.log('appTest')

  const { data, error } = await useFetch('/api/appointment', {
    method: 'DELETE',
    body: {
      id: 1,
    },
  })
  if (error) {
    console.log('error', error.value)
  }
  if (data.value) {
    console.log('data', data.value)
  }
  // console.log('appdata', data)
}

onMounted(() => {})
</script>

<template>
  <div>
    <button @click="testApi">testApi</button>
  </div>
  <div @click="appTest">appointment</div>
  <div @click="getApppTest">getApp</div>
  <div @click="deleteAppTest">deleteApp</div>
</template>

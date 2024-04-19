<script setup lang="ts">
// const { data } = await useFetch('/server/api/hello')
// console.log('data', data)
import { useUserStore } from '@/stores/user'
import { appointmentPost } from '@/api/appointment'
const { $notify }: any = useNuxtApp()
const user = useUserStore()

async function testApi() {
  const { data } = await useFetch('/api/endpointTest', {
    method: 'POST',
  })
  console.log('testData', data)

  // try {
  //   const { data, status } = await appointmentPost({
  //     name: 'test',
  //     time: '2013-11-10 10:10:10',
  //   })
  // } catch (error) {
  //   console.log('error', error)
  // }
}

async function appTest() {
  console.log('appTest')
  //寫一個appointment的api
  // const { data, error } = await useFetch('/api/auth/google-auth-token', {
  //   method: 'POST',
  //   body: loginrData,
  // })
  console.log('userStore', JSON.parse(JSON.stringify(user)))
  try {
    const { data } = await useFetch('/api/appointment/', {
      method: 'POST',
      body: {
        name: 'test',
        time: '2022-10-10 10:10:10',
      },
      onResponse({ request, response, options }) {
        console.log('onResponse', response)
        if (response.status == 400) {
          console.log('抓')
          $notify({
            type: 'success',
            title: 'Notification Title',
            text: 'Notification Text',
          })
        }
        // console.log('onResponse', request)
        // console.log('onResponse', options)
      },
    })
    // console.log('statusCode', pending.value)
    // 处理返回的数据
  } catch (error) {
    // 处理错误
    console.error('An error occurred:', error)
  }

  // console.log('data.value', data.value)
  // if (data.value.statusCode === 400) {
  //   $notify({
  //     type: 'success',
  //     title: 'Notification Title',
  //     text: 'Notification Text',
  //   })
  // }
  // if (data.value) {
  //   console.log('data', data.value)
  // }
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

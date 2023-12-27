<template>
  <!-- <span>{{ testString }}</span> -->

  <button @click="testApi">77</button>
  <button @click="handleGoogleLogin">googlelogin</button>
  <div>
    <button @click="execute">refresh</button>
  </div>

  <div v-if="pending">Loading ...</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// import { getStaffInfoByPage } from '@/api/test'
import { googleTokenLogin } from 'vue3-google-login'
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public

// const testString = ref(33333)
// function testApi() {
//   getStaffInfoByPage().then((res) => {
//     console.log('res', res)
//   })
// }

async function handleGoogleLogin() {
  const accessToken = await googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID,
  }).then((response) => response?.access_token)
  console.log('accessToken', accessToken)

  if (!accessToken) {
    // 登入失敗
    return
  }
  // getGoogleUserInfo()

  // 在這裡使用 getGoogleUserInfo，並將 data 和 accessToken 傳遞給它
  // await getGoogleUserInfo(data, accessToken as string)

  // userInfo.value = data.value
  const { data, execute, pending } = await useFetch('/api/auth/google-auth-token', {
    method: 'POST',
    body: {
      accessToken,
    },
  })
  console.log('logindata', data.value)
  router.push({ path: '/reservation' })
}
</script>

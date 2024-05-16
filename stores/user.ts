import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      profile: {
        id: null,
        provider: {
          name: null,
        },
        nickname: null,
        avatar: null,
        email: null,
      },
      count: 0,
    }
  },
  actions: {
    async googleLogin(loginrData: any) {
      const { data, error } = await useFetch('/api/auth/google-auth-token', {
        method: 'POST',
        body: loginrData,
        mode: 'cors',
        // initialCache: false,
      })
      const profileData = JSON.parse(JSON.stringify(data.value))
      console.log('profileData', profileData)
      if (data && data.value) {
        this.profile = profileData
      }
      this.count++

      return {
        data,
        error,
      }
    },
  },
})

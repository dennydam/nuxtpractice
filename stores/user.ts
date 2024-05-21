import { defineStore } from 'pinia'
import { userReservation } from '~/server/model/user'

interface Reservation {
  id: number
  treatment: string
  appointmentTime: string
}

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
      userReservation: [] as Reservation[],
    }
  },
  actions: {
    async googleLogin(loginrData: any) {
      let profileData: any = sessionStorage.getItem('profile')
      if (profileData) {
        console.log('profileData', profileData)
        this.profile = JSON.parse(profileData)
      } else {
        // 假设这里有一个 API 调用来获取用户信息
        const { data, error } = await useFetch('/api/auth/google-auth-token', {
          method: 'POST',
          body: loginrData,
          mode: 'cors',
          // initialCache: false,
        })
        console.log('data', data)
        profileData = JSON.parse(JSON.stringify(data.value))
        if (data && data.value) {
          this.profile = profileData
        }
        sessionStorage.setItem('profile', JSON.stringify(this.profile))
      }

      // const profileData = JSON.parse(JSON.stringify(data.value))
      // console.log('profileData', profileData)
      // if (data && data.value) {
      //   this.profile = profileData
      // }
      this.count++

      return {
        profileData,
        // error,
      }
    },
    async getAppointment() {
      const userId = this.profile.id
      console.log('userState', userId)
      try {
        const { data }: any = await useFetch('/api/userappointment/', {
          method: 'POST',
          body: {
            userId: userId,
          },
        })
        console.log('datareserve', data.value)
        this.userReservation = data.value.data
        this.userReservation.forEach((item: any) => {
          let dateTimeString = item.appointmentTime
          const dateTime = new Date(dateTimeString)

          item.appointmentTime = dateTime.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          // console.log(item.appointmentTime)
        })
        // console.log('會員預約資料data', data.value.data[0])
        // console.log('會員預約資料data', this.userReservation)
      } catch (error) {
        console.error('An error occurred:', error)
        return null
      }
    },
    async deleteAppointment(id: number) {
      console.log('deleteAppointment', id)
      this.userReservation = this.userReservation.filter((reservation: Reservation) => reservation.id !== id)
      // 更新 sessionStorage 中的 userReservation
      sessionStorage.setItem('userReservation', JSON.stringify(this.userReservation))
    },
  },
})

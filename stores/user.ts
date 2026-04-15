import { defineStore } from 'pinia'
import type { ReservationApiResponse, AppointmentItem } from '@/types/appointment'

interface GoogleLoginData {
  [key: string]: unknown
}

interface GoogleLoginResult {
  profileData: unknown
}

export const useUserStore = defineStore('user', () => {
  const count = ref<number>(0)
  const userReservation = ref<AppointmentItem[]>([])

  async function googleLogin(loginrData: GoogleLoginData): Promise<GoogleLoginResult> {
    const data = await $fetch('/api/auth/google-auth-token', {
      method: 'POST',
      body: loginrData,
    })

    const profileCookie = useCookie('profile', {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
    })

    const profileData = JSON.parse(JSON.stringify(data))
    profileCookie.value = profileData
    count.value++

    return { profileData }
  }

  async function getAppointment(): Promise<void> {
    const profileCookie = useCookie('profile')
    const profileData = typeof profileCookie.value === 'string'
      ? JSON.parse(profileCookie.value)
      : profileCookie.value
    const userId: string | null = profileData?.id ?? null

    try {
      const data: ReservationApiResponse = await $fetch('/api/userappointment/', {
        method: 'POST',
        body: { userId },
      })

      userReservation.value = data.data ?? []

      userReservation.value.forEach((item: AppointmentItem) => {
        const dateTime = new Date(item.appointmentTime)
        item.appointmentTime = dateTime.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      })
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  async function deleteAppointment(id: number): Promise<void> {
    userReservation.value = userReservation.value.filter(
      (reservation) => reservation.id !== id,
    )
    sessionStorage.setItem('userReservation', JSON.stringify(userReservation.value))
  }

  return {
    count: readonly(count),
    userReservation: readonly(userReservation),
    googleLogin,
    getAppointment,
    deleteAppointment,
  }
})

import { createError } from 'h3'
import { userReservation } from '../model/user'
import { AppointmentItem } from '../../types/appointment'

export const getUserReservation = async (userId: string): Promise<AppointmentItem[]> => {
  console.log('controllerItem', userId)

  try {
    const nitroApp = useNitroApp()
    const db = nitroApp.db
    const result = await userReservation(db, userId)
    return result
  } catch (error: unknown) {
    console.log('getUserReservationError', error)
    if (typeof error === 'object' && error !== null && 'status' in error && (error as { status: number }).status === 400) {
      throw createError({
        statusCode: 400,
        statusMessage: '查詢錯誤',
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: '伺服器錯誤',
    })
  }
}

import { defineEventHandler, readBody } from 'h3'
import { getUserReservation } from '../controller/user'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ userId: string }>(event)
  const userId = body.userId

  const appointmentRecord = await getUserReservation(userId)
  return {
    data: appointmentRecord,
  }
})

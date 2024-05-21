import { defineEventHandler, readBody, createError } from 'h3'
import { getUserReservation } from '../controller/user.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const appointmentRecord = await getUserReservation(body)
  return {
    data: appointmentRecord,
  }
})

import { defineEventHandler, readBody, createError } from 'h3'

import { getUserReservation } from '../controller/user.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userId = body.userId
  const appointmentRecord = await getUserReservation(userId)
  return {
    data: appointmentRecord,
  }
})

import { defineEventHandler, readBody, createError } from 'h3'
import { getUserReservation } from '../controller/user.js'

// import db from '../db/appointment'
import appointment from '../db/appointment.js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Apibody', body)
  const appointmentRecord = await getUserReservation(body)
  console.log('appointmentRecord', appointmentRecord)
  return {
    data: appointmentRecord,
  }
})

import { defineEventHandler, readBody, createError } from 'h3'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
import { getUserReservation } from '../controller/user.js'

// import appointment from '../db/appointment'
import { addAppointmentCtrl } from '../controller/appointment'

// import db from '@/server/db'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Apibody', body.userId)
  const userId = body.userId
  const appointmentRecord = await getUserReservation(userId)
  console.log('appointmentRecord', appointmentRecord)
  return {
    data: appointmentRecord,
  }
})

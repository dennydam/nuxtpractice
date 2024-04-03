import { defineEventHandler, readBody, createError } from 'h3'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// import db from '../db/appointment'
import appointment from '../db/appointment'

export default defineEventHandler(async (event) => {
  console.log('appointment.get.ts')
  // const body = await readBody(event)
  // console.log('body', body)
  const appointmentRecord = await appointment.getAppointment({})
  return {
    data: appointmentRecord,
  }
})

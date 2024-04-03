import { defineEventHandler, readBody, createError } from 'h3'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// import db from '../db/appointment'
import appointment from '../db/appointment'

export default defineEventHandler((event) => {
  const deleteAppointmentRes = prisma.appointment.delete({
    where: {
      id: 6,
    },
  })
  return deleteAppointmentRes
})

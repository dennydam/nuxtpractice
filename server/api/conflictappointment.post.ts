import { defineEventHandler, readBody, createError } from 'h3'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// import appointment from '../db/appointment'
import * as appointmentCtrl from '../controller/appointment'

// import db from '@/server/db'

export default defineEventHandler(async (event) => {
  try {
    const result = await appointmentCtrl.conflictAppointment()
    console.log('appointment.post.ts', result.value)

    return {
      data: result,
    }
  } catch (error) {
    // 如果发生错误，进行适当的处理
    console.error('An error occurred:', error)
    return {
      error: 'An error occurred while reading appointment',
    }
  }
})

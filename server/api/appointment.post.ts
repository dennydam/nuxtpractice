import { defineEventHandler, readBody, createError } from 'h3'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// import appointment from '../db/appointment'
import { addAppointmentCtrl } from '../controller/appointment'

// import db from '@/server/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    console.log('預約相關', body)
    const result = await addAppointmentCtrl(event)

    console.log('appointment.post.ts', result)

    return {
      data: result,
    }
  } catch (error) {
    // 如果发生错误，进行适当的处理
    console.error('An error occurred:', error)
    if (error.statusCode == 400) {
      throw createError({
        statusCode: 400,
        statusMessage: '預約時間衝突',
      })
    } else {
      return {
        error: 'An error occurred while reading appointment',
      }
    }
  }
})

// userRecord = await user.createUser({
//   providerName: 'google',
//   providerUserId: userInfo.sub,
//   nickname: userInfo.name,
//   email: userInfo.email,
//   password: null,
//   avatar: userInfo.picture,
//   emailVerified: userInfo.email_verified,
// })

// export default defineEventHandler(async (event) => {
//   console.log('appointment.post.ts')
//   const body = await readBody(event)
//   console.log('body', body)
//   const findAppointment = await appointment.getAppointmentByTime({
//     appointmentTime: body.appointmentTime,
//   })
//   if (findAppointment) {
//     console.log('找到同赴時間拉', findAppointment)
//     throw createError({
//       statusCode: 400,
//       statusMessage: 'Appointment already exists.',
//     })
//   }
//   const appointmentRecord = await appointment.createAppointment({
//     id: 'test',
//     treatment: '',
//     appointmentTime: '',
//     createdAt: '',
//     updatedAt: '',
//     User: '',
//   })
//   return {
//     data: appointmentRecord,
//   }
// })

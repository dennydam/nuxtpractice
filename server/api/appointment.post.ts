import { defineEventHandler, readBody, createError } from 'h3'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// import db from '../db/appointment'
import appointment from '../db/appointment'

// import db from '@/server/db'

// userRecord = await user.createUser({
//   providerName: 'google',
//   providerUserId: userInfo.sub,
//   nickname: userInfo.name,
//   email: userInfo.email,
//   password: null,
//   avatar: userInfo.picture,
//   emailVerified: userInfo.email_verified,
// })
export default defineEventHandler(async (event) => {
  console.log('appointment.post.ts')
  const body = await readBody(event)
  console.log('body', body)
  const appointmentRecord = await appointment.createAppointment({
    id: 'test',
    treatment: '',
    appointmentTime: '',
    createdAt: '',
    updatedAt: '',
    User: '',
  })

  return {
    data: appointmentRecord,
  }
})

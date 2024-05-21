import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody, createError } from 'h3'

// import prisma from '@/server/utils/prismaClient'
const prisma = new PrismaClient() // 假設 Prisma 生成的模型名稱是 User

class Appointment {
  async createAppointment(options) {
    const appointmentRecord = await prisma.appointment
      .create({
        data: {
          treatment: 'test',
          authorId: 'aaaaa-00001',
          appointmentTime: '2013-09-01T00:00:00.000Z',
        },
      })
      .catch((error) => {
        console.error('error', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Could not create appointment. Please try again later.',
        })
      })
    return appointmentRecord
  }
  //尋找重複預約
  async getAppointmentByTime(options: { appointmentTime: string }) {
    const userRecord = await prisma.appointment
      .findFirst({
        where: {
          appointmentTime: options.appointmentTime,
        },
      })
      .catch((error: any) => {
        throw createError({
          statusCode: 500,
          statusMessage: 'Could not find user. Please try again later.',
        })
      })
    return userRecord
  }

  async getAppointment(options: any = {}) {
    const appointmentRecords = await prisma.appointment
      .findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip: options.pageSize ? options.page * options.pageSize : undefined,
        take: options.pageSize,
      })
      .catch((error) => {
        console.error(error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Could not get article. Please try again later.',
        })
      })
    return appointmentRecords
  }

  async getAppointmentById(options: any = {}) {
    const appointmentRecord = await prisma.appointment
      .findFirst({
        where: {
          id: options.id,
        },
      })
      .catch((error) => {
        console.error(error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Could not fon article. Please try again later.',
        })
      })

    return appointmentRecord
  }
  async deleteAppointmentById(options: any = {}) {
    const appointmentRecord = await prisma.appointment
      .delete({
        where: {
          id: 6,
        },
      })
      .catch((error) => {
        console.error(error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Could not fon article. Please try again later.',
        })
      })

    return appointmentRecord
  }
}

// async getArticleById(options = {}) {
//   const articleRecord = await prisma.article
//     .findFirst({
//       where: {
//         id: options.id,
//       },
//     })
//     .catch((error) => {
//       console.error(error)
//       throw createError({
//         statusCode: 500,
//         statusMessage: 'Could not fon article. Please try again later.',
//       })
//     })

//   return articleRecord
// }

const appointment = new Appointment()

export default appointment

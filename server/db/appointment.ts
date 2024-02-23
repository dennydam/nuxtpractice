import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody, createError } from 'h3'

const prisma = new PrismaClient() // 假設 Prisma 生成的模型名稱是 User

class Appointment {
  async createAppointment(options) {
    const AppointmentRecord = await prisma.appointment
      .create({
        data: {
          title: options.title,
          content: options.content,
          summary: options.summary,
          cover: options.cover,
          tags: options.tags,
          authorId: options.authorId,
        },
      })
      .catch((error) => {
        console.error(error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Could not create Appointment. Please try again later.',
        })
      })

    return AppointmentRecord
  }

  async getAppointments(options = {}) {
    const AppointmentRecords = await prisma.Appointment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: options.pageSize ? options.page * options.pageSize : undefined,
      take: options.pageSize,
    }).catch((error) => {
      console.error(error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Could not get Appointment. Please try again later.',
      })
    })

    return AppointmentRecords
  }

  async getAppointmentById(options = {}) {
    const AppointmentRecord = await prisma.Appointment.findFirst({
      where: {
        id: options.id,
      },
    }).catch((error) => {
      console.error(error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Could not fon Appointment. Please try again later.',
      })
    })

    return AppointmentRecord
  }
}

const app = new Appointment()

export default app

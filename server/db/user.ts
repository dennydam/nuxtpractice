import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody, createError } from 'h3'

const prisma = new PrismaClient() // 假設 Prisma 生成的模型名稱是 User

class User {
  async createUser(options) {
    const userRecord = await prisma.user
      .create({
        data: {
          providerName: options.providerName,
          providerUserId: options.providerUserId,
          nickname: options.nickname,
          email: options.email,
          password: options.password,
          avatar: options.avatar,
          emailVerified: options.emailVerified,
        },
      })
      .catch((error) => {
        console.error(error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Could not create user. Please try again later.',
        })
      })
    return userRecord
  }

  async getUserByEmail(options: { email: string }) {
    const userRecord = await prisma.user
      .findFirst({
        where: {
          email: options.email,
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
}

const db = new User()
export default db

// export user

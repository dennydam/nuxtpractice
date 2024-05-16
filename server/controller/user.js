import { H3Event, createError } from 'h3'
import { userLoginModel, userReservation } from '../model/user'

const config = {
  server: process.env.NUXT_DB_SERVER,
  authentication: {
    type: 'default',
    options: {
      userName: process.env.NUXT_DB_USER,
      // domain: 'DESKTOP-JSLVL3F',
      password: process.env.NUXT_DB_PASSWORD,
    },
  },
  options: {
    database: process.env.NUXT_DB_DATABASE,
    encrypt: true,
  },
}
export const userLogin = async (item) => {
  console.log('userLoing到')
  // const body = await readBody(item)
  // console.log('userRRbody', body)

  try {
    const result = await userLoginModel(config, item)
    return result
  } catch (error) {
    console.log('userLogiinError', error)
    if (error.status == 400) {
      throw createError({
        statusCode: 400,
        statusMessage: '登入錯誤',
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: '登入錯誤500',
      })
    }
  }
}

export const getUserReservation = async (item) => {
  console.log('controllerItem', item)
  try {
    const result = await userReservation(config, item)
    return result
  } catch (error) {
    console.log('userLogiinError', error)
    if (error.status == 400) {
      throw createError({
        statusCode: 400,
        statusMessage: '登入錯誤',
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: '登入錯誤500',
      })
    }
  }
}

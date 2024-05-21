import { defineEventHandler, readBody, createError } from 'h3'
import { addAppointmentCtrl } from '../controller/appointment'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const result = await addAppointmentCtrl(event)

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

import { defineEventHandler, readBody, createError } from 'h3'
import { deleteAppointmentCtrl } from '../controller/appointment.js'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    console.log('預約相關', body)
    const appointmentId = body.appointmentId
    const result = await deleteAppointmentCtrl(appointmentId)
    console.log('appdelete', result)

    // console.log('appointment.post.ts', result)

    // return {
    //   data: result,
    // }
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

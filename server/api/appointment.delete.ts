import { defineEventHandler, readBody, createError } from 'h3'
import { deleteAppointmentCtrl } from '../controller/appointment.js'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const appointmentId = body.appointmentId
    const result = await deleteAppointmentCtrl(appointmentId)

    return {
      data: result,
    }
  } catch (error) {
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

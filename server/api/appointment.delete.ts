import { defineEventHandler, readBody, createError } from 'h3'
import { deleteAppointmentCtrl } from '../controller/appointment'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const appointmentId = body.appointmentId
    const result = await deleteAppointmentCtrl(appointmentId)

    return {
      data: result,
    }
  } catch (error: unknown) {
    console.error('An error occurred:', error)
    if (error && typeof error === 'object' && 'statusCode' in error) {
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

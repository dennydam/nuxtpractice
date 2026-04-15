import { defineEventHandler, createError } from 'h3'
import { addAppointmentCtrl } from '../controller/appointment'

export default defineEventHandler(async (event) => {
  try {
    const result = await addAppointmentCtrl(event)
    return { data: result }
  } catch (error: unknown) {
    console.error('An error occurred:', error)
    if (typeof error === 'object' && error !== null && 'statusCode' in error && (error as { statusCode: number }).statusCode === 400) {
      throw createError({ statusCode: 400, statusMessage: '預約時間衝突' })
    }
    return { error: 'An error occurred while reading appointment' }
  }
})

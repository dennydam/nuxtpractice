import { H3Event, createError, readBody } from 'h3'
import { addAppointment, deleteAppointment } from '../model/appointment'

interface AddAppointmentBody {
  userId: string
  appointmentTime: string
  treatment: string
}

export const addAppointmentCtrl = async (event: H3Event): Promise<unknown> => {
  const body = await readBody<AddAppointmentBody>(event)

  const nitroApp = useNitroApp()
  const db = nitroApp.db

  console.log('controllerItem', body)

  try {
    const result = await addAppointment(db, body)
    console.log('預約結果', result)
    return result
  } catch (error: unknown) {
    console.log('addAppointmentControllerError', error)
    if (typeof error === 'object' && error !== null && 'status' in error && (error as { status: number }).status === 400) {
      throw createError({
        statusCode: 400,
        statusMessage: '預約時間衝突',
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: '伺服器錯誤',
    })
  }
}

export const deleteAppointmentCtrl = async (appointmentId: string | number): Promise<unknown> => {
  console.log('controllerDeleteItem', appointmentId)

  const nitroApp = useNitroApp()
  const db = nitroApp.db

  try {
    const result = await deleteAppointment(db, appointmentId)
    return result
  } catch (error: unknown) {
    console.log('deleteError', error)
    throw createError({
      statusCode: 500,
      statusMessage: '刪除失敗',
    })
  }
}

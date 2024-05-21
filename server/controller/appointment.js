import { H3Event, createError } from 'h3'
import { addAppointment, deleteAppointment } from '../model/appointment'

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
export const readAppointment = async () => {
  try {
    const result = await appointmentModel.executeStatement(config, '')
    return result
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'somehteionroiw',
    })
  }
}

export const addAppointmentCtrl = async (item) => {
  const body = await readBody(item)

  console.log('controllerItem', body)
  try {
    const result = await addAppointment(config, body)
    return result
  } catch (error) {
    console.log('addAppointeControllerError', error)
    if (error.status == 400) {
      throw createError({
        statusCode: 400,
        statusMessage: '預約時間衝突',
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'somehteionroiw',
      })
    }
  }
}

export const deleteAppointmentCtrl = async (appointmentId) => {
  console.log('controlllerDeleteItem', appointmentId)
  try {
    const result = await deleteAppointment(config, appointmentId)
    return result
  } catch (e) {
    console.log('deletee', e)
  }
}

export const conflictAppointment = async () => {
  try {
    const result = await appointmentModel.conflictAppointment(config, '')
    return result
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'somehteionroiw',
    })
  }
}

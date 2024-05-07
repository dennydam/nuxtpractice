import { H3Event, createError } from 'h3'
import { addAppointment } from '../model/appointment'
const config = {
  server: 'DESKTOP-JSLVL3F',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      domain: 'DESKTOP-JSLVL3F',
      password: '3939889',
    },
  },
  options: {
    database: 'sideprojectDB',
    encrypt: false,
  },
}
export const readAppointment = async () => {
  try {
    const result = await appointmentModel.executeStatement(config, '')
    console.log('resultcontroller', result)
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
    console.log('conttrollerapppResult', result)
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

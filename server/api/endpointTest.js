import * as appointmentCtrl from '../controller/appointment.js'

export default defineEventHandler(async (event) => {
  try {
    const result = await appointmentCtrl.readAppointment()
    console.log('userseach', result.value)

    return {
      data: result,
    }
  } catch (error) {
    // 如果发生错误，进行适当的处理
    console.error('An error occurred:', error)
    return {
      error: 'An error occurred while reading appointment',
    }
  }
})

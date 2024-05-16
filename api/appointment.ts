import Http from '../utils/useHttp'
export const appointmentPost = (data: any) => {
  console.log('appointment.ts', data)
  return Http.post('/api/appointment', data)
}
//  const { data } = await useFetch('/api/appointment/', {
//       method: 'POST',
//       body: {
//         name: 'test',
//         time: '2022-10-10 10:10:10',
//       },

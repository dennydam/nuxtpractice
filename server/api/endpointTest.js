export default defineEventHandler(async (event) => {
  const nitro = useNitroApp()
  const query = getQuery(event)
  const body = await readBody(event)
  console.log('33333')
  console.log('nitro', nitro)
  const [res] = await nitro.db.query('SELECT * FROM Appointment')

  return {
    api: 'works',
    name: query.name,
    body: body,
    db: res,
  }
})

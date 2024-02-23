import { defineEventHandler, readBody, createError } from 'h3'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// export default defineEventHandler(async (event) => {
//   const body = await readBody(event)
//   let user = null
//   if (body.name) {
//     user = await prisma.user
//       .create({
//         data: {
//           name: body.name,
//         },
//       })
//       .then((response) => {
//         user = response
//         console.log('response', response)
//       })
//   }
//   return {
//     user: user,
//   }
// })
export default defineEventHandler(() => {
  const user = prisma.user.create({
    data: {
      providerName: null,
      providerUserId: null,
      nickname: 'Ryan',
      email: 'ryanchien8125@gmail.com',
      password: '這裡要放密碼的雜湊值',
      avatar: '',
      emailVerified: true,
    },
  })

  return user
})

import { OAuth2Client } from 'google-auth-library'
import { userLogin } from '../../controller/user'

// import jwt from 'jsonwebtoken'
import { defineEventHandler, setCookie, readBody, createError, message } from 'h3'
import { PrismaClient } from '@prisma/client'

// console.log('prisma', prisma)
export default defineEventHandler(async (event) => {
  // const { googleClientId, googleClientSecret } = useRuntimeConfig()

  const body = await readBody(event)
  console.log('body', body)
  const oauth2Client = new OAuth2Client()
  oauth2Client.setCredentials({ access_token: body.accessToken })

  const userInfo = await oauth2Client
    .request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    })
    .then((response) => response.data)
    .catch(() => null)
  console.log('userInfo', userInfo)

  if (!userInfo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid token',
    })
  }
  //下列db.user typescript 會報錯誤

  try {
    let userRecord = await userLogin(userInfo)
    console.log('userRecord', userRecord)
    return {
      id: userInfo.sub,
      provider: {
        name: userInfo.name,
      },
      nickname: userInfo.given_name,
      email: userInfo.email,
    }
    // return userRecord
  } catch (error) {
    console.log('登入錯誤', error)
    // throw createError({
    //   statusCode: 500,
    //   statusMessage: 'user登入過程出錯',
    // })
  }

  // let userRecord = await user.getUserByEmail({
  //   email: userInfo.email,
  // })

  // if (userRecord) {
  //   if ((userRecord.providerName === 'google' && userRecord.providerUserId === userInfo.sub) === false) {
  //     throw createError({
  //       statusCode: 400,
  //       statusMessage: 'This email address does not apply to this login method',
  //     })
  //   }
  //   console.log('有有喔有創過了', userRecord)
  // } else {
  //   userRecord = await user.createUser({
  //     providerName: 'google',
  //     providerUserId: userInfo.sub,
  //     nickname: userInfo.name,
  //     email: userInfo.email,
  //     password: null,
  //     avatar: userInfo.picture,
  //     emailVerified: userInfo.email_verified,
  //   })
  // }
  const jwtTokenPayload = {
    id: userRecord.id,
  }

  // const maxAge = 60 * 60 * 24 * 7
  // const maxAge = 300 // 五分鐘的秒數
  // const expires = Math.floor(Date.now() / 1000) + maxAge

  // const jwtToken = jwt.sign(
  //   {
  //     exp: expires,
  //     data: jwtTokenPayload,
  //   },
  //   'testttttttt'
  // )
  // console.log('jewtoken', jwtToken)

  // setCookie(event, 'counter', '333333')
})

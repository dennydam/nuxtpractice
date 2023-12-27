import { OAuth2Client } from 'google-auth-library'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('body', body)
  const oauth2Client = new OAuth2Client()
  oauth2Client.setCredentials({ access_token: body.accessToken })

  const userInfo: any = await oauth2Client
    .request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    })
    .then((response) => response.data)
    .catch(() => null)

  if (!userInfo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid token',
    })
  }

  return {
    id: userInfo.sub,
    name: userInfo.name,
    avatar: userInfo.picture,
    email: userInfo.email,
    emailVerified: userInfo.email_verified,
  }
})

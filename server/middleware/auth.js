import jwt from 'jsonwebtoken'

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler((event) => {
  const jwtToken = getCookie(event, 'access_token')

  // return navigateTo('/login')
  if (!jwtToken) {
    return
  }
  let userInfo = null

  try {
    const { data } = jwt.verify(jwtToken, runtimeConfig.jwtSignSecret)
    userInfo = data
    if (userInfo?.id) {
      event.context.auth = {
        user: {
          id: userInfo.id,
        },
      }
    }
  } catch (e) {}
})

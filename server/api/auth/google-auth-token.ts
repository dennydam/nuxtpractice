import { OAuth2Client } from 'google-auth-library'
import { defineEventHandler, readBody, createError } from 'h3'

interface GoogleAuthBody {
  accessToken: string
}

interface GoogleUserInfo {
  sub: string
  name: string
  given_name: string
  email: string
}

interface GoogleAuthResponse {
  id: string
  provider: {
    name: string
  }
  nickname: string
  email: string
}

export default defineEventHandler(async (event): Promise<GoogleAuthResponse> => {
  const body = await readBody<GoogleAuthBody>(event)

  const oauth2Client = new OAuth2Client()
  oauth2Client.setCredentials({ access_token: body.accessToken })

  const userInfo = await oauth2Client
    .request<GoogleUserInfo>({
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

  // 將使用者 upsert 進 User 資料表，確保外鍵約束可通過
  const nitroApp = useNitroApp()
  const db = nitroApp.db

  // Step 1: 先嘗試插入（若已存在則忽略）
  await new Promise<void>((resolve, reject) => {
    db.run(
      `INSERT OR IGNORE INTO User (id, providerName, providerUserId, nickname, email, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [userInfo.sub, 'google', userInfo.sub, userInfo.given_name, userInfo.email],
      (err) => {
        if (err) {
          console.error('User INSERT OR IGNORE 失敗:', err)
          return reject(err)
        }
        console.log('User INSERT OR IGNORE 成功, id:', userInfo.sub)
        resolve()
      },
    )
  })

  // Step 2: 更新既有資料
  await new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE User SET nickname = ?, email = ?, updatedAt = datetime('now') WHERE id = ?`,
      [userInfo.given_name, userInfo.email, userInfo.sub],
      (err) => {
        if (err) {
          console.error('User UPDATE 失敗:', err)
          return reject(err)
        }
        console.log('User UPDATE 成功, id:', userInfo.sub)
        resolve()
      },
    )
  })

  return {
    id: userInfo.sub,
    provider: {
      name: userInfo.name,
    },
    nickname: userInfo.given_name,
    email: userInfo.email,
  }
})

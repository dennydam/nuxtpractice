import { Connection, Request, TYPES } from 'tedious'
export const userLoginModel = async (config, item) => {
  // interface BodyType {
  //   appointmentTime: string; // 假设 appointmentTime 是一个字符串
  //   // 其他属性的类型声明...
  // }
  console.log('userItemModel', item)
  console.log('userLoginModel')

  // const body = await readBody(item)

  return new Promise((resolve, reject) => {
    let connection = new Connection(config)
    connection.on('connect', (err) => {
      if (err) {
        reject(err)
      } else {
        const checkConflictQuery = `
          SELECT *
          FROM [User]
          WHERE [id] = @userId
        `
        // console.log('checkConflictQuey檢查', checkConflictQuery)

        // 創建一個新的 Request 對象，並傳遞時間衝突查詢
        const checkConflictRequest = new Request(checkConflictQuery, (err, rowCount) => {
          if (err) {
            console.log('conflicterror', err)
            reject(err)
          } else {
            const conflictCount = rowCount
            console.log('item.sub', item.sub)

            if (conflictCount > 0) {
              console.log('There is user already.')
              resolve({ message: '已註冊過', status: 'error' })
            } else {
              // 如果沒有時間衝突，則執行插入操作
              const insertQuery = `
              INSERT INTO[dennyDB1].[dbo].[User] ([id], [providerName], 
                [providerUserId], [nickname], [email], [password], [emailVerified], [createdAt], [updatedAt], [avatar])
VALUES (@userId, @googleGivenName, 'randomId', '@googleName', 'email_value', 'passwordrandom', 0, GETDATE(), GETDATE(), 'avatar_value');
              `
              const insertRequest = new Request(insertQuery, (insertErr, insertRowCount) => {
                if (insertErr) {
                  reject(insertErr)
                } else {
                  console.log(`${insertRowCount} rows inserted`)
                  resolve(insertRowCount)
                }
              })
              // 將用戶 ID 作為參數添加到插入查詢中
              insertRequest.addParameter('userId', TYPES.NVarChar, item.sub)
              insertRequest.addParameter('googleGivenName', TYPES.NVarChar, item.given_name)
              insertRequest.addParameter('googleName', TYPES.NVarChar, item.name)

              // 執行插入操作
              connection.execSql(insertRequest)
            }
          }
        })
        // 將實際的值傳遞給 SQL 查詢中的參數
        checkConflictRequest.addParameter('userId', TYPES.NVarChar, item.sub)

        // checkConflictRequest.addParameter('item.sub', TYPES.string, userId)

        // 將要查詢的用戶 ID 作為參數添加到查詢中
        // checkConflictRequest.addParameter('userId', TYPES.NVarChar, userId)
        // 執行時間衝突查詢
        connection.execSql(checkConflictRequest)
      }
    })

    connection.connect()
  })
}
export const userReservation = async (config, item) => {
  return new Promise((resolve, reject) => {
    let connection = new Connection(config)
    const results = [] // 用于存储所有行的值
    console.log('intemIDuserReservation', item)

    connection.on('connect', (err) => {
      if (err) {
        reject(err)
      } else {
        const reservationQuery = `
            SELECT *
            FROM [Appointment]
            WHERE [authorId] = @userId;
        `

        // console.log('checkConflictQuey檢查', checkConflictQuery)

        // 創建一個新的 Request 對象，並傳遞時間衝突查詢
        const reservationRequest = new Request(reservationQuery, (err, rowCount) => {
          if (err) {
            console.log('conflicterror', err)
            reject(err)
          } else {
            resolve(results)
          }
          // connection.close()
        })
        reservationRequest.addParameter('userId', TYPES.NVarChar, item)

        reservationRequest.on('row', (columns) => {
          const rowValues = {} // 用于存储当前行的值
          columns.forEach((column) => {
            // 将当前行的每一列的值存储在 rowValues 中
            rowValues[column.metadata.colName] = column.value
          })
          // 将当前行的值存储在 results 数组中
          results.push(rowValues)
          console.log('results', results)
        })

        // 將實際的值傳遞給 SQL 查詢中的參數

        // checkConflictRequest.addParameter('item.sub', TYPES.string, userId)

        // 將要查詢的用戶 ID 作為參數添加到查詢中
        // checkConflictRequest.addParameter('userId', TYPES.NVarChar, userId)
        // 執行時間衝突查詢
        connection.execSql(reservationRequest)
      }
    })

    connection.connect()
  })
}

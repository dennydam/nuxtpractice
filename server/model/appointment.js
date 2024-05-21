import { Connection, Request, TYPES } from 'tedious'
import appointment from '../db/appointment'

export const executeStatement = (config, query) => {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config)
    const results = [] // 用于存储所有行的值

    connection.on('connect', (err) => {
      if (err) {
        reject(err)
      } else {
        const request = new Request('SELECT * FROM [User]', (err, rowCount) => {
          if (err) {
            reject(err)
          } else {
            // console.log(`${rowCount} rows returned`)
            // 在请求完成时，一次性返回所有结果
            resolve(results)
          }
          connection.close()
        })

        request.on('row', (columns) => {
          const rowValues = {} // 用于存储当前行的值
          columns.forEach((column) => {
            // 将当前行的每一列的值存储在 rowValues 中
            rowValues[column.metadata.colName] = column.value
          })
          // 将当前行的值存储在 results 数组中
          results.push(rowValues)
        })

        connection.execSql(request)
      }
    })

    connection.connect()
  })
}

export const addAppointment = async (config, item) => {
  // interface BodyType {
  //   appointmentTime: string; // 假设 appointmentTime 是一个字符串
  // }
  // const body = await readBody(item)

  return new Promise((resolve, reject) => {
    let connection = new Connection(config)
    connection.on('connect', (err) => {
      if (err) {
        reject(err)
      } else {
        const appointmentTime = item.appointmentTime // 輸入的時間字串

        // 將輸入的時間字串轉換為 JavaScript 的日期物件
        const date = new Date(appointmentTime)

        // 取得日期部分
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        // 取得時間部分
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = '00' // 預設秒數為 00
        const milliseconds = '000' // 預設毫秒數為 000
        const timezoneOffset = date.getTimezoneOffset() // 取得時區偏移量（分鐘）

        // 格式化時間
        const formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${getTimezoneOffsetString(
          timezoneOffset
        )}`

        console.log('formattedTime', formattedTime) // 輸出格式化後的時間

        // 輔助函式：取得時區偏移量的字串表示
        function getTimezoneOffsetString(offset) {
          const sign = offset > 0 ? '-' : '+'
          const absOffset = Math.abs(offset)
          const hours = String(Math.floor(absOffset / 60)).padStart(2, '0')
          const minutes = String(absOffset % 60).padStart(2, '0')
          return `${sign}${hours}:${minutes}`
        }

        const checkConflictQuery = `
          SELECT *
          FROM [Appointment]
          WHERE [authorId] = @authorId
          AND [appointmentTime] = @appoint
        `
        // console.log('checkConflictQuey檢查', checkConflictQuery)

        // 創建一個新的 Request 對象，並傳遞時間衝突查詢
        const checkConflictRequest = new Request(checkConflictQuery, (err, rowCount, rows) => {
          if (err) {
            console.log('conflicterror', err)
            reject(err)
          } else {
            const conflictCount = rowCount
            console.log('conflictCount', conflictCount)
            if (conflictCount > 0) {
              console.log('There is a time conflict.')
              reject({ status: 400, message: 'Time conflict' })
            } else {
              // 如果沒有時間衝突，則執行插入操作
              const insertQuery = `
                INSERT INTO [Appointment] ([treatment], [appointmentTime], [createdAt], [updatedAt], [authorId])
                VALUES ('測試療程', @appointmentTime, GETDATE(), GETDATE(), @userId);
              `
              const insertRequest = new Request(insertQuery, (insertErr, insertRowCount) => {
                if (insertErr) {
                  reject(insertErr)
                } else {
                  console.log(`${insertRowCount} rows inserted`)
                  resolve({
                    status: 200,
                    message: '預約成功',
                    insertedRows: insertRowCount,
                  })
                  // resolve(insertRowCount)
                }
              })
              // 將用戶 ID 作為參數添加到插入查詢中
              const userId = '2'
              insertRequest.addParameter('userId', TYPES.NVarChar, item.userId)
              insertRequest.addParameter('appointmentTime', TYPES.DateTime, formattedTime)

              // 執行插入操作
              connection.execSql(insertRequest)
            }
          }
        })
        // 將實際的值傳遞給 SQL 查詢中的參數
        checkConflictRequest.addParameter('appoint', TYPES.DateTime, formattedTime)
        checkConflictRequest.addParameter('authorId', TYPES.NVarChar, item.userId)

        // 將要查詢的用戶 ID 作為參數添加到查詢中
        // checkConflictRequest.addParameter('userId', TYPES.NVarChar, userId)
        // 執行時間衝突查詢
        connection.execSql(checkConflictRequest)
      }
    })

    connection.connect()
  })
}

export const deleteAppointment = async (config, appointmentId) => {
  return new Promise((resolve, reject) => {
    let connection = new Connection(config)
    connection.on('connect', (err) => {
      if (err) {
        reject(err)
      } else {
        // 檢查時間衝突的 SQL 查詢
        // const appointmentTime = item.
        const deleteAppointmentId = appointmentId.toString()

        // 如果沒有時間衝突，則執行插入操作
        const deleteQuery = `DELETE FROM [dennyDB1].[dbo].[Appointment]
                 WHERE [id] = @appointmentId;                
              `
        const deleteRequest = new Request(deleteQuery, (deleteErr, deleteRowCount) => {
          if (deleteErr) {
            reject(deleteErr)
          } else {
            console.log(`${deleteRowCount} rows delete`)
            // reject({ status: 400, message: 'Time conflict' })

            resolve({ staus: 200, message: ' success' })
          }
        })

        deleteRequest.addParameter('appointmentId', TYPES.NVarChar, deleteAppointmentId)
        // 執行插入操作
        connection.execSql(deleteRequest)
      }
    })

    connection.connect()
  })
}

// export const addAppointment = (config, query) => {
//   return new Promise((resolve, reject) => {
//     const connection = new Connection(config)
//     const results = [] // 用于存储所有行的值

//     connection.on('connect', (err) => {
//       if (err) {
//         reject(err)
//       } else {
//         const userId = 2
//         // 構建 SQL 查詢
//         const sqlQuery = `
//               INSERT INTO [Appointment] ([treatment], [appointmentTime], [createdAt], [updatedAt], [authorId])
//               VALUES ('測試療程', GETDATE(), GETDATE(), GETDATE(), '${userId}');
//             `
//         const request = new Request(sqlQuery, (err, rowCount) => {
//           if (err) {
//             console.log('插入療程錯誤err', err)
//             reject(err)
//           } else {
//             console.log(`${rowCount} rows returned`)
//             // 在请求完成时，一次性返回所有结果
//             resolve(results)
//           }
//           connection.close()
//         })

//         // request.on('row', (columns) => {
//         //   const rowValues = {}
//         //   columns.forEach((column) => {
//         //     rowValues[column.metadata.colName] = column.value
//         //   })
//         //   results.push(rowValues)
//         // })

//         connection.execSql(request)
//       }
//     })

//     connection.connect()
//   })
// }

// export const conflictAppointment = (config, query) => {
//   return new Promise((resolve, reject) => {
//     const connection = new Connection(config)
//     const results = [] // 用于存储所有行的值

//     connection.on('connect', (err) => {
//       if (err) {
//         reject(err)
//       } else {
//         const userId = '1'
//         const treatment = 'TreatmentName'
//         const appointmentTime = new Date() // 取得當前時間

//         // 檢查時間衝突的 SQL 查詢
//         const checkConflictQuery = `
//               SELECT COUNT(*)
//               FROM [Appointment]
//               WHERE [authorId] = '${userId}'
//               AND [appointmentTime] = @appointmentTime`
//         const request = new Request(checkConflictQuery, (err, rowCount) => {
//           if (err) {
//             console.log('插入療程錯誤err', err)
//             reject(err)
//           } else {
//             const conflictCount = rowCount[0][0].value
//             if (conflictCount > 0) {
//               console.log('有衝突')
//             } else {
//               console.log(`${rowCount} rows returned`)
//               // 在请求完成时，一次性返回所有结果
//               resolve(results)
//             }
//           }
//           connection.close()
//         })

//         // request.on('row', (columns) => {
//         //   const rowValues = {}
//         //   columns.forEach((column) => {
//         //     rowValues[column.metadata.colName] = column.value
//         //   })
//         //   results.push(rowValues)
//         // })

//         connection.execSql(request)
//       }
//     })

//     connection.connect()
//   })
// }

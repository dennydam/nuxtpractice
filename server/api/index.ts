// // var Connection = require('tedious').Connection
// import { Connection } from 'tedious'
// // var Request = require('tedious').Request
// // import { Request } from 'tedious'
// import { defineEventHandler, readBody, createError } from 'h3'
// // console.log('middleware/database.js')

// var config = {
//   server: 'DESKTOP-AO0HJH8', //update me
//   authentication: {
//     type: 'default',
//     options: {
//       userName: 'sa', //update me
//       domain: 'DESKTOP-AO0HJH8', //update me
//       password: '3939889',
//       // password: 'cindydenny',
//     },
//   },
//   options: {
//     // If you are on Microsoft Azure, you need encryption:
//     // instanceName: 'someinstance',
//     // server: 'DESKTOP-AO0HJH8\\denny'
//     database: 'imsdb', //update me
//     encrypt: false,
//     // trustedConnection: true,
//     // trustServerCertificate: true, // Add this line
//   },
// }

// let connection // 保持連線的全域變數

// // var Request = require('tedious').Request
// import { Request } from 'tedious'
// // var TYPES = require('tedious').TYPES

// connection = new Connection(config)
// function connectToDatabase() {
//   connection.on('connect', (err) => {
//     if (err) {
//       console.error('Error connecting to database:', err.message)
//       // Handle the error or retry connection
//     } else {
//       console.log('Connected to database')
//       executeStatement()
//     }
//   })
// }
// connection.connect()

// connectToDatabase() // 初始化連線
// export default defineEventHandler(async (event) => {
//   const body = await readBody(event)
//   console.log('body', body)
//   const row = [{ aa: 'cc' }]
// })

// function executeStatement() {
//   var request = new Request('SELECT * FROM Appointment;', function (err) {
//     if (err) {
//       console.log(err)
//     }
//   })
//   var result = ''
//   request.on('row', function (columns) {
//     columns.forEach(function (column) {
//       if (column.value === null) {
//         console.log('NULL')
//       } else {
//         result += column.value + ' '
//       }
//     })
//     console.log(result)
//     result = ''
//   })

//   request.on('done', function (rowCount, more) {
//     console.log(rowCount + ' rows returned')
//   })

//   // Close the connection after the final event emitted by the request, after the callback passes
//   request.on('requestCompleted', function (rowCount, more) {
//     connection.close()
//   })
//   connection.execSql(request)
// }

// // export default function (req, res, next) {
// //   req.database = connection // 將連線對象添加到 req 對象，以便在路由中使用
// //   // console.log('req.databaes', req.database)
// //   res.status(200).json({ message: 'Connected to database' })
// //   // next()
// // }

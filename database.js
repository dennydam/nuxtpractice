// var Connection = require('tedious').Connection
import { Connection } from 'tedious'
// var Request = require('tedious').Request
// import { Request } from 'tedious'
import { defineEventHandler, readBody, createError } from 'h3'
// console.log('middleware/database.js')

var config = {
  server: 'DESKTOP-AO0HJH8', //update me
  authentication: {
    type: 'default',
    options: {
      userName: 'sa', //update me
      domain: 'DESKTOP-AO0HJH8', //update me
      password: '3939889',
      // password: 'cindydenny',
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    // instanceName: 'someinstance',
    // server: 'DESKTOP-AO0HJH8\\denny'
    database: 'imsdb', //update me
    encrypt: false,
    // trustedConnection: true,
    // trustServerCertificate: true, // Add this line
  },
}

let connection // 保持連線的全域變數

function connectToDatabase() {
  connection = new Connection(config)
  connection.on('connect', (err) => {
    if (err) {
      console.error('Error connecting to database:', err.message)
      // Handle the error or retry connection
    } else {
      console.log('Connected to database')
    }
  })
  connection.connect()
}

connectToDatabase() // 初始化連線
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('body', body)
  const row = [{ aa: 'cc' }]
})

// export default function (req, res, next) {
//   req.database = connection // 將連線對象添加到 req 對象，以便在路由中使用
//   // console.log('req.databaes', req.database)
//   res.status(200).json({ message: 'Connected to database' })
//   // next()
// }

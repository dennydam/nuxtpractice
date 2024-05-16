import { Connection } from 'tedious'
import { Request } from 'tedious'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineNitroPlugin((nitro) => {
  //   options: {
  //     // If you are on Microsoft Azure, you need encryption:
  //     // instanceName: 'someinstance',
  //     // server: 'DESKTOP-AO0HJH8\\denny'
  //     database: 'sideprojectDB', //update me
  //     encrypt: false,
  //     // trustedConnection: true,
  //     // trustServerCertificate: true, // Add this line
  //   },
  // }

  const config = {
    server: process.env.NUXT_DB_SERVER,
    authentication: {
      type: 'default',
      options: {
        userName: process.env.NUXT_DB_USER,
        // domain: 'DESKTOP-JSLVL3F',
        password: process.env.NUXT_DB_PASSWORD,
      },
    },
    options: {
      database: process.env.NUXT_DB_DATABASE,
      encrypt: true,
    },
  }

  let connection // 保持連線的全域變數

  // var Request = require('tedious').Request
  // var TYPES = require('tedious').TYPES

  connection = new Connection(config)
  function connectToDatabase() {
    connection.on('connect', (err) => {
      if (err) {
        console.error('Error connecting to database:', err.message)
        // Handle the error or retry connection
      } else {
        nitro.db = connection
        // nitro.db = connection
        console.log('Connected to databaseNITROO連到拉')
        executeStatement()
      }
    })
  }
  connection.connect()

  connectToDatabase() // 初始化連線
  // executeStatement()

  function executeStatement() {
    var request = new Request('SELECT * FROM [User]', function (err) {
      if (err) {
        console.log(err)
      }
    })
    var result = ''
    request.on('row', function (columns) {
      columns.forEach(function (column) {
        if (column.value === null) {
          console.log('NULL')
        } else {
          result += column.value + ' '
        }
      })
      console.log('result', result)
      result = ''
    })

    // request.on('done', function (rowCount, more) {
    //   console.log(rowCount + ' rows returned')
    // })

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on('requestCompleted', function (rowCount, more) {
      connection.close()
    })
    connection.execSql(request)
  }
})

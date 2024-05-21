import { Connection } from 'tedious'
import { Request } from 'tedious'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineNitroPlugin((nitro) => {
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

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on('requestCompleted', function (rowCount, more) {
      connection.close()
    })
    connection.execSql(request)
  }
})

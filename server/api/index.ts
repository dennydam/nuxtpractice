// import { UseFetchOptions, useFetch } from 'nuxt/app'
// import { Connection } from 'tedious'

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
// function connectToDatabase() {
//   connection = new Connection(config)
//   connection.on('connect', (err: any) => {
//     if (err) {
//       console.error('Error connecting to database:', err.message)
//       // Handle the error or retry connection
//     } else {
//       console.log('Connected to database')
//     }
//   })
//   connection.connect()
// }
// connectToDatabase()

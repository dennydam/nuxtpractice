import { createRequire } from 'module'
import type * as sqlite3Types from 'sqlite3'

function loadSqlite3(): typeof sqlite3Types {
  return createRequire(import.meta.url)('sqlite3')
}

const { Database } = loadSqlite3()

export default defineNitroPlugin((nitro) => {
  const db = new Database('./database.sqlite', (err) => {
    if (err) {
      console.error('Error connecting to database:', err.message)
      return
    }
    console.log('Connected to SQLite database')
    db.run('PRAGMA foreign_keys = ON')
    initializeDatabase(db)
  })

  nitro.db = db
})

function initializeDatabase(db: sqlite3Types.Database): void {
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS User (
      id TEXT PRIMARY KEY,
      providerName TEXT,
      providerUserId TEXT,
      nickname TEXT,
      email TEXT,
      password TEXT,
      emailVerified INTEGER,
      createdAt TEXT,
      updatedAt TEXT,
      avatar TEXT
    )
  `

  const createAppointmentTable = `
    CREATE TABLE IF NOT EXISTS Appointment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      treatment TEXT,
      appointmentTime TEXT,
      createdAt TEXT,
      updatedAt TEXT,
      authorId TEXT,
      FOREIGN KEY(authorId) REFERENCES User(id)
    )
  `

  db.run(createUserTable, (err) => {
    if (err) {
      console.error('建立 User 表失敗:', err)
    } else {
      console.log('User 表建立成功或已存在')
    }
  })

  db.run(createAppointmentTable, (err) => {
    if (err) {
      console.error('建立 Appointment 表失敗:', err)
    } else {
      console.log('Appointment 表建立成功或已存在')
    }
  })
}

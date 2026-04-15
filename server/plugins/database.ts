import { DatabaseSync } from 'node:sqlite'

const db = new DatabaseSync('./database.sqlite')

export default defineNitroPlugin((nitro) => {
  console.log('Connected to SQLite database')
  db.exec('PRAGMA foreign_keys = ON')
  initializeDatabase()
  nitro.db = db
})

function initializeDatabase(): void {
  db.exec(`
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
  `)
  console.log('User 表建立成功或已存在')

  db.exec(`
    CREATE TABLE IF NOT EXISTS Appointment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      treatment TEXT,
      appointmentTime TEXT,
      createdAt TEXT,
      updatedAt TEXT,
      authorId TEXT,
      FOREIGN KEY(authorId) REFERENCES User(id)
    )
  `)
  console.log('Appointment 表建立成功或已存在')
}

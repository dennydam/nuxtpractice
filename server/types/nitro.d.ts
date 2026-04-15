import type { Database } from 'sqlite3'

declare module 'nitropack' {
  interface NitroApp {
    db: Database
  }
}

import type { DatabaseSync } from 'node:sqlite'

declare module 'nitropack' {
  interface NitroApp {
    db: DatabaseSync
  }
}

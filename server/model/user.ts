import type { DatabaseSync } from 'node:sqlite'
import type { AppointmentItem } from '../../types/appointment'

export const userReservation = (db: DatabaseSync, userId: string): AppointmentItem[] => {
  console.log('查詢預約，User ID:', userId)
  const stmt = db.prepare('SELECT * FROM Appointment WHERE authorId = ?')
  const rows = stmt.all(userId) as AppointmentItem[]
  console.log('查詢結果:', rows)
  return rows
}

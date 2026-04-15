import type { Database } from 'sqlite3'
import { AppointmentItem } from '../../types/appointment'

export const userReservation = (db: Database, userId: string): Promise<AppointmentItem[]> => {
  return new Promise((resolve, reject) => {
    console.log('查詢預約，User ID:', userId)

    const reservationQuery = `
      SELECT *
      FROM Appointment
      WHERE authorId = ?
    `

    db.all(reservationQuery, [userId], (err, rows: AppointmentItem[]) => {
      if (err) {
        console.error('查詢失敗:', err)
        reject(err)
      } else {
        console.log('查詢結果:', rows)
        resolve(rows)
      }
    })
  })
}

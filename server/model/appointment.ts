import type { Database } from 'sqlite3'

interface AddAppointmentBody {
  userId: string
  appointmentTime: string
  treatment: string
}

interface AppointmentResult {
  status: number
  message: string
  insertedRows?: number
  id?: number
  deletedRows?: number
}

export const addAppointment = (db: Database, item: AddAppointmentBody): Promise<AppointmentResult> => {
  return new Promise((resolve, reject) => {
    const dateObj = new Date(item.appointmentTime)
    const formattedTime = dateObj.toISOString()

    const checkConflictQuery = `
      SELECT count(*) as count
      FROM Appointment
      WHERE authorId = ?
      AND appointmentTime = ?
    `

    db.get(checkConflictQuery, [item.userId, formattedTime], (err, row: { count: number }) => {
      if (err) {
        console.error('檢查衝突失敗:', err)
        return reject(err)
      }

      if (row.count > 0) {
        console.log('There is a time conflict.')
        return reject({ status: 400, message: 'Time conflict' })
      }

      const insertQuery = `
        INSERT INTO Appointment (treatment, appointmentTime, createdAt, updatedAt, authorId)
        VALUES (?, ?, datetime('now'), datetime('now'), ?)
      `

      const params = [item.treatment, formattedTime, item.userId]

      db.run(insertQuery, params, function (insertErr) {
        if (insertErr) {
          console.error('插入失敗:', insertErr)
          return reject(insertErr)
        }

        console.log(`${this.changes} rows inserted, ID: ${this.lastID}`)

        resolve({
          status: 200,
          message: '預約成功',
          insertedRows: this.changes,
          id: this.lastID,
        })
      })
    })
  })
}

export const deleteAppointment = (db: Database, appointmentId: string | number): Promise<AppointmentResult> => {
  return new Promise((resolve, reject) => {
    const deleteQuery = `DELETE FROM Appointment WHERE id = ?`

    db.run(deleteQuery, [appointmentId], function (err) {
      if (err) {
        console.error('刪除失敗:', err)
        return reject(err)
      }

      console.log(`${this.changes} rows deleted`)

      if (this.changes === 0) {
        resolve({
          status: 404,
          message: '找不到該筆預約，刪除失敗',
          deletedRows: 0,
        })
      } else {
        resolve({
          status: 200,
          message: '刪除成功',
          deletedRows: this.changes,
        })
      }
    })
  })
}

import type { DatabaseSync } from 'node:sqlite'

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

export const addAppointment = (db: DatabaseSync, item: AddAppointmentBody): AppointmentResult => {
  const dateObj = new Date(item.appointmentTime)
  const formattedTime = dateObj.toISOString()

  const checkStmt = db.prepare('SELECT count(*) as count FROM Appointment WHERE authorId = ? AND appointmentTime = ?')
  const row = checkStmt.get(item.userId, formattedTime) as { count: number }

  if (row.count > 0) {
    console.log('There is a time conflict.')
    throw { status: 400, message: 'Time conflict' }
  }

  const insertStmt = db.prepare(`
    INSERT INTO Appointment (treatment, appointmentTime, createdAt, updatedAt, authorId)
    VALUES (?, ?, datetime('now'), datetime('now'), ?)
  `)
  const result = insertStmt.run(item.treatment, formattedTime, item.userId)
  console.log(`${result.changes} rows inserted, ID: ${result.lastInsertRowid}`)

  return {
    status: 200,
    message: '預約成功',
    insertedRows: result.changes,
    id: Number(result.lastInsertRowid),
  }
}

export const deleteAppointment = (db: DatabaseSync, appointmentId: string | number): AppointmentResult => {
  const deleteStmt = db.prepare('DELETE FROM Appointment WHERE id = ?')
  const result = deleteStmt.run(appointmentId)
  console.log(`${result.changes} rows deleted`)

  if (result.changes === 0) {
    return {
      status: 404,
      message: '找不到該筆預約，刪除失敗',
      deletedRows: 0,
    }
  }

  return {
    status: 200,
    message: '刪除成功',
    deletedRows: result.changes,
  }
}


// 1. 定義單筆預約的資料結構 (對應資料庫欄位)
export interface AppointmentItem {
  id: number
  treatment: string
  appointmentTime: string // 從後端傳來通常是 ISO 字串
  createdAt: string
  updatedAt: string
  authorId: string
}

// 2. 定義 API 回傳的最外層結構
// 根據您之前的 API 寫法，回傳的是 { status: 200, data: [...] }
export interface ReservationApiResponse {
  status: number
  data: AppointmentItem[]
}

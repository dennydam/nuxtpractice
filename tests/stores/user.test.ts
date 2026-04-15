import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import type { ReservationApiResponse } from '@/types/appointment'

// mock useCookie 回傳一個有 id 的假 profile
vi.stubGlobal('useCookie', () => ({
  value: { id: 'test-user-1' },
}))

const mockReservations: ReservationApiResponse = {
  status: 200,
  data: [
    { id: 1, treatment: 'A', appointmentTime: '2026-03-18T10:00:00.000Z', createdAt: '', updatedAt: '', authorId: 'test-user-1' },
    { id: 2, treatment: 'B', appointmentTime: '2026-03-18T11:00:00.000Z', createdAt: '', updatedAt: '', authorId: 'test-user-1' },
  ],
}

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('初始狀態：count 為 0、userReservation 為空陣列', () => {
    const store = useUserStore()

    expect(store.count).toBe(0)
    expect(store.userReservation).toEqual([])
  })

  it('getAppointment：成功取得預約清單', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(mockReservations))

    const store = useUserStore()
    await store.getAppointment()

    expect(store.userReservation).toHaveLength(2)
    expect(store.userReservation[0].id).toBe(1)
    expect(store.userReservation[1].id).toBe(2)
  })

  it('deleteAppointment：移除指定 id 的預約', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(mockReservations))

    const store = useUserStore()
    await store.getAppointment()
    await store.deleteAppointment(1)

    expect(store.userReservation).toHaveLength(1)
    expect(store.userReservation[0].id).toBe(2)
  })

  it('deleteAppointment：刪除不存在的 id 時，清單不變', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(mockReservations))

    const store = useUserStore()
    await store.getAppointment()
    await store.deleteAppointment(999)

    expect(store.userReservation).toHaveLength(2)
  })

  // --- 錯誤路徑（unhappy path）---

  it('getAppointment：網路錯誤時，userReservation 維持空陣列', async () => {
    // 模擬 $fetch throw（網路斷線、500 error 等）
    vi.stubGlobal('$fetch', vi.fn().mockRejectedValue(new Error('Network Error')))

    const store = useUserStore()
    await store.getAppointment()

    // store 內有 try/catch，不應該 crash，資料維持空陣列
    expect(store.userReservation).toEqual([])
  })

  it('getAppointment：API 回傳空陣列時，userReservation 為空', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue({ status: 200, data: [] }))

    const store = useUserStore()
    await store.getAppointment()

    expect(store.userReservation).toHaveLength(0)
  })

  it('getAppointment：API 回傳 data 為 null 時，userReservation 為空陣列（測試 ?? [] 防禦）', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue({ status: 200, data: null }))

    const store = useUserStore()
    await store.getAppointment()

    // stores/user.ts 第 50 行：data.data ?? []，應防禦 null
    expect(store.userReservation).toEqual([])
  })
})

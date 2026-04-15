import { test, expect } from '@playwright/test'

// 注入假的 profile cookie，讓 addAppointment 認為已登入
test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: 'profile',
      value: JSON.stringify({ id: 'test-user-1' }),
      domain: 'localhost',
      path: '/',
    },
  ])
})

// ─────────────────────────────────────────────
// Step 1：/reservation（選服務頁）
// ─────────────────────────────────────────────

test.describe('Step 1：選擇服務頁', () => {
  test('顯示 3 張服務卡片', async ({ page }) => {
    await page.goto('/reservation')

    // 每張卡片都有 "Select" 按鈕
    const selectBtns = page.getByRole('button', { name: 'Select' })
    await expect(selectBtns).toHaveCount(3)
  })

  test('Read more 展開詳細說明', async ({ page }) => {
    await page.goto('/reservation')

    const readMoreBtn = page.getByRole('button', { name: 'Read more' }).first()
    await readMoreBtn.click()

    // 展開後按鈕文字變成 Read less
    await expect(page.getByRole('button', { name: 'Read less' }).first()).toBeVisible()
  })

  test('Read less 收合詳細說明', async ({ page }) => {
    await page.goto('/reservation')

    // 展開再收合
    await page.getByRole('button', { name: 'Read more' }).first().click()
    await page.getByRole('button', { name: 'Read less' }).first().click()

    await expect(page.getByRole('button', { name: 'Read more' }).first()).toBeVisible()
  })

  test('點選 Select 跳轉到時間選擇頁', async ({ page }) => {
    await page.goto('/reservation')

    await page.getByRole('button', { name: 'Select' }).first().click()

    // URL 應變成 /reservation/:id
    await expect(page).toHaveURL(/\/reservation\/\d+/)
  })
})

// ─────────────────────────────────────────────
// Step 2：/reservation/[id]（選時間頁）
// ─────────────────────────────────────────────

test.describe('Step 2：選擇時間頁', () => {
  test('未選時段時，Book Now 是 disabled', async ({ page }) => {
    await page.goto('/reservation/1')

    const bookBtn = page.getByRole('button', { name: 'Book Now' })
    await expect(bookBtn).toBeDisabled()
  })

  test('點選時段後，Book Now 變成可點擊', async ({ page }) => {
    await page.goto('/reservation/1')

    // 點 11:00（status: 0，可用）
    await page.getByRole('button', { name: '11:00' }).click()

    const bookBtn = page.getByRole('button', { name: 'Book Now' })
    await expect(bookBtn).toBeEnabled()
  })

  test('點選 ← Back to Service 跳回選服務頁', async ({ page }) => {
    await page.goto('/reservation/1')

    await page.getByRole('link', { name: /Back to Service/ }).click()

    await expect(page).toHaveURL('/reservation')
  })

  test('完整預約流程：選時段 → 送出 → 成功通知', async ({ page }) => {
    // 攔截 POST /api/appointment/ 回傳成功，避免打真實 DB
    await page.route('/api/appointment/', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 200, message: 'ok' }),
      })
    })

    // 攔截 getAppointment（Book Now 後 store 會呼叫）
    await page.route('/api/userappointment', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 200, data: [] }),
      })
    })

    await page.goto('/reservation/1')

    // 選時段
    await page.getByRole('button', { name: '11:00' }).click()

    // 確認「Selected:」文字出現
    await expect(page.locator('text=Selected:')).toBeVisible()

    // 點 Book Now
    await page.getByRole('button', { name: 'Book Now' }).click()

    // 成功通知出現
    await expect(page.locator('text=預約成功')).toBeVisible()

    // 自動跳回 /reservation
    await expect(page).toHaveURL('/reservation')
  })

  test('未登入（無 cookie）時，Book Now 顯示錯誤通知', async ({ context, page }) => {
    // 清除登入 cookie
    await context.clearCookies()

    await page.goto('/reservation/1')

    await page.getByRole('button', { name: '11:00' }).click()
    await page.getByRole('button', { name: 'Book Now' }).click()

    await expect(page.locator('text=User not logged in')).toBeVisible()
  })
})

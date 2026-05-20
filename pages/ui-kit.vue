<script setup lang="ts">
import type { AppointmentItem } from '@/types/appointment'

definePageMeta({ layout: false })

const inputText = ref<string>('')
const inputEmail = ref<string>('')
const loadingBtn = ref<boolean>(false)

function simulateLoading(): void {
  loadingBtn.value = true
  setTimeout(() => { loadingBtn.value = false }, 2000)
}

// ── UiList Scoped Slot 示範資料 ────────────────────────────────

interface Member {
  id: number
  name: string
  role: string
  status: 'active' | 'inactive'
}

const members = ref<Member[]>([
  { id: 1, name: '王小明', role: '前端工程師', status: 'active' },
  { id: 2, name: '陳大文', role: '後端工程師', status: 'active' },
  { id: 3, name: '李美麗', role: 'UI 設計師', status: 'inactive' },
])

const appointments = ref<AppointmentItem[]>([
  { id: 1, treatment: '深層護膚', appointmentTime: '2026-06-10T10:00:00.000Z', createdAt: '', updatedAt: '', authorId: 'u1' },
  { id: 2, treatment: '精油按摩', appointmentTime: '2026-06-11T14:00:00.000Z', createdAt: '', updatedAt: '', authorId: 'u1' },
])

const emptyList = ref<Member[]>([])

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('zh-TW', {
    month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 px-6 py-12">
    <div class="mx-auto max-w-4xl space-y-16">

      <!-- Header -->
      <div class="border-b border-slate-200 pb-8">
        <h1 class="text-3xl font-bold text-slate-900">UI Component Library</h1>
        <p class="mt-2 text-slate-500">Nuxt 3 · TypeScript · Tailwind CSS</p>
      </div>

      <!-- ─── Button ─────────────────────────────────────────────── -->
      <section class="space-y-6">
        <h2 class="text-xl font-semibold text-slate-800">UiButton</h2>

        <div class="space-y-4">
          <p class="text-sm font-medium text-slate-500">Variants</p>
          <div class="flex flex-wrap gap-3">
            <UiButton variant="primary">Primary</UiButton>
            <UiButton variant="secondary">Secondary</UiButton>
            <UiButton variant="outline">Outline</UiButton>
            <UiButton variant="ghost">Ghost</UiButton>
            <UiButton variant="danger">Danger</UiButton>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-sm font-medium text-slate-500">Sizes</p>
          <div class="flex flex-wrap items-center gap-3">
            <UiButton size="sm">Small</UiButton>
            <UiButton size="md">Medium</UiButton>
            <UiButton size="lg">Large</UiButton>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-sm font-medium text-slate-500">States</p>
          <div class="flex flex-wrap items-center gap-3">
            <UiButton :loading="loadingBtn" @click="simulateLoading">
              {{ loadingBtn ? '載入中...' : '點我模擬 Loading' }}
            </UiButton>
            <UiButton disabled>Disabled</UiButton>
            <UiButton variant="outline" block class="max-w-xs">Block Button</UiButton>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-sm font-medium text-slate-500">ui prop 單例覆寫</p>
          <p class="text-xs text-slate-400">透過 <code class="rounded bg-slate-100 px-1 font-mono">:ui="{ root: '...' }"</code> 覆寫單一按鈕樣式，不影響其他按鈕</p>
          <div class="flex flex-wrap items-center gap-3">
            <UiButton :ui="{ root: 'rounded-full' }">圓形按鈕</UiButton>
            <UiButton variant="primary" :ui="{ root: 'rounded-full px-8 shadow-lg shadow-emerald-200' }">加強陰影</UiButton>
            <UiButton variant="outline" :ui="{ root: 'border-2 border-dashed' }">虛線外框</UiButton>
          </div>
        </div>
      </section>

      <!-- ─── Input ──────────────────────────────────────────────── -->
      <section class="space-y-6">
        <h2 class="text-xl font-semibold text-slate-800">UiInput</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <UiInput
            v-model="inputText"
            label="姓名"
            placeholder="請輸入姓名"
            helper-text="最多 50 個字元"
            required
          />
          <UiInput
            v-model="inputEmail"
            type="email"
            label="Email"
            placeholder="you@example.com"
          />
          <UiInput
            label="密碼"
            type="password"
            placeholder="請輸入密碼"
            error-message="密碼至少需要 8 個字元"
          />
          <UiInput
            label="停用欄位"
            placeholder="無法輸入"
            disabled
          />
        </div>

        <div class="space-y-3">
          <p class="text-sm font-medium text-slate-500">ui prop 單例覆寫</p>
          <p class="text-xs text-slate-400">透過 <code class="rounded bg-slate-100 px-1 font-mono">:ui="{ label, input, helper, error }"</code> 精準控制各節點樣式</p>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <UiInput
              label="粉色風格"
              placeholder="自訂 label 和 input"
              helper-text="label 和框線都換色了"
              :ui="{ label: 'text-pink-500', input: 'border-pink-300 focus:border-pink-500 focus:ring-pink-100' }"
            />
            <UiInput
              label="圓形輸入框"
              placeholder="rounded-full 覆寫"
              :ui="{ input: 'rounded-full px-5' }"
            />
          </div>
        </div>
      </section>

      <!-- ─── Badge ──────────────────────────────────────────────── -->
      <section class="space-y-6">
        <h2 class="text-xl font-semibold text-slate-800">UiBadge</h2>
        <div class="space-y-4">
          <p class="text-sm font-medium text-slate-500">Variants</p>
          <div class="flex flex-wrap gap-2">
            <UiBadge variant="default">Default</UiBadge>
            <UiBadge variant="success">Success</UiBadge>
            <UiBadge variant="warning">Warning</UiBadge>
            <UiBadge variant="danger">Danger</UiBadge>
            <UiBadge variant="info">Info</UiBadge>
          </div>
          <p class="text-sm font-medium text-slate-500">With Dot</p>
          <div class="flex flex-wrap gap-2">
            <UiBadge variant="success" dot>上線中</UiBadge>
            <UiBadge variant="warning" dot>維護中</UiBadge>
            <UiBadge variant="danger" dot>已下線</UiBadge>
          </div>
        </div>
      </section>

      <!-- ─── Card ───────────────────────────────────────────────── -->
      <section class="space-y-6">
        <h2 class="text-xl font-semibold text-slate-800">UiCard</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <UiCard>
            <p class="text-sm text-slate-600">基本 Card，只有 body slot。</p>
          </UiCard>

          <UiCard hoverable>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-slate-800">可懸停 Card</h3>
                <UiBadge variant="success" dot>上線</UiBadge>
              </div>
            </template>
            <p class="text-sm text-slate-600">滑鼠移上去會有陰影效果。</p>
            <template #footer>
              <div class="flex justify-end gap-2">
                <UiButton variant="ghost" size="sm">取消</UiButton>
                <UiButton size="sm">確認</UiButton>
              </div>
            </template>
          </UiCard>

          <UiCard shadow="none" class="col-span-full">
            <template #header>
              <h3 class="font-semibold text-slate-800">使用者資訊</h3>
            </template>
            <div class="flex items-center gap-4">
              <UiAvatar name="王小明" size="lg" />
              <div>
                <p class="font-medium text-slate-800">王小明</p>
                <p class="text-sm text-slate-500">wang@example.com</p>
              </div>
              <UiBadge variant="info" class="ml-auto">管理員</UiBadge>
            </div>
          </UiCard>
        </div>
      </section>

      <!-- ─── Alert ──────────────────────────────────────────────── -->
      <section class="space-y-6">
        <h2 class="text-xl font-semibold text-slate-800">UiAlert</h2>
        <div class="space-y-3">
          <UiAlert variant="success" title="操作成功">預約已成功送出，請等待確認通知。</UiAlert>
          <UiAlert variant="warning" title="注意">此操作將在 24 小時後自動生效。</UiAlert>
          <UiAlert variant="danger" title="發生錯誤" dismissible>無法連線至伺服器，請稍後再試。</UiAlert>
          <UiAlert variant="info" dismissible>系統將於今晚 23:00 進行例行維護。</UiAlert>
        </div>
      </section>

      <!-- ─── Avatar ─────────────────────────────────────────────── -->
      <section class="space-y-6">
        <h2 class="text-xl font-semibold text-slate-800">UiAvatar</h2>
        <div class="space-y-4">
          <p class="text-sm font-medium text-slate-500">Sizes & Initials</p>
          <div class="flex flex-wrap items-end gap-4">
            <UiAvatar name="王小明" size="sm" />
            <UiAvatar name="陳大文" size="md" />
            <UiAvatar name="李美麗" size="lg" />
            <UiAvatar name="張志偉" size="xl" />
          </div>
          <p class="text-sm font-medium text-slate-500">Image Fallback</p>
          <div class="flex flex-wrap items-end gap-4">
            <UiAvatar src="https://invalid-url.example/broken.jpg" name="Broken Image" size="lg" />
            <UiAvatar name="No Image" size="lg" shape="square" />
          </div>
        </div>
      </section>

      <!-- ─── UiList (Scoped Slot) ──────────────────────────────── -->
      <section class="space-y-6">
        <h2 class="text-xl font-semibold text-slate-800">UiList — Scoped Slot</h2>
        <p class="text-sm text-slate-500">
          同一個 <code class="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">UiList</code>
          元件，透過 Scoped Slot 讓父元件決定每一列的渲染方式。
        </p>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">

          <!-- 用法一：成員列表（Avatar + Badge） -->
          <UiCard>
            <template #header>
              <h3 class="font-semibold text-slate-800">用法一：成員列表</h3>
            </template>

            <UiList :items="members">
              <template #default="{ item }">
                <div class="flex items-center gap-3 py-3">
                  <UiAvatar :name="item.name" size="sm" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-slate-800 truncate">{{ item.name }}</p>
                    <p class="text-xs text-slate-500 truncate">{{ item.role }}</p>
                  </div>
                  <UiBadge
                    :variant="item.status === 'active' ? 'success' : 'default'"
                    dot
                  >
                    {{ item.status === 'active' ? '在職' : '離職' }}
                  </UiBadge>
                </div>
              </template>
            </UiList>
          </UiCard>

          <!-- 用法二：預約紀錄（完全不同的 slot 內容） -->
          <UiCard>
            <template #header>
              <h3 class="font-semibold text-slate-800">用法二：預約紀錄</h3>
            </template>

            <UiList :items="appointments">
              <template #default="{ item, index }">
                <div class="flex items-center gap-3 py-3">
                  <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                    {{ index + 1 }}
                  </span>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-slate-800">{{ item.treatment }}</p>
                    <p class="text-xs text-slate-500">{{ formatDate(item.appointmentTime) }}</p>
                  </div>
                  <UiBadge variant="info">已預約</UiBadge>
                </div>
              </template>
            </UiList>
          </UiCard>

          <!-- 用法三：空狀態（自訂 empty slot） -->
          <UiCard class="sm:col-span-2">
            <template #header>
              <h3 class="font-semibold text-slate-800">用法三：空狀態（自訂 empty slot）</h3>
            </template>

            <UiList :items="emptyList">
              <template #default="{ item }">
                <p>{{ item.name }}</p>
              </template>
              <template #empty>
                <div class="flex flex-col items-center gap-2 py-8 text-slate-400">
                  <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="text-sm font-medium">目前沒有任何資料</p>
                  <UiButton variant="outline" size="sm">新增第一筆</UiButton>
                </div>
              </template>
            </UiList>
          </UiCard>

        </div>
      </section>

    </div>
  </div>
</template>

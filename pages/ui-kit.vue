<script setup lang="ts">
definePageMeta({ layout: false })

const inputText = ref<string>('')
const inputEmail = ref<string>('')
const loadingBtn = ref<boolean>(false)

function simulateLoading(): void {
  loadingBtn.value = true
  setTimeout(() => { loadingBtn.value = false }, 2000)
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

    </div>
  </div>
</template>

# Claude Code 專案指引

## 技術棧
- **Framework**: Nuxt 3
- **Language**: TypeScript（strict mode）
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **API**: 自己的後端 API（使用 Nuxt 內建 fetch 工具）

---

## 元件規範

### 基本結構
- 一律使用 Composition API + `<script setup lang="ts">`
- **禁止**使用 Options API
- 順序：`<script setup>` → `<template>` → `<style>`

```vue
<!-- ✅ 正確 -->
<script setup lang="ts">
const props = defineProps<{
  title: string
  count?: number
}>()
</script>

<template>
  <div>{{ props.title }}</div>
</template>
```

### Props & Emits
- Props 用 `defineProps<{}>()` 搭配 TypeScript 泛型定義型別
- 有預設值時使用 `withDefaults()`
- Emits 用 `defineEmits<{}>()` 定義

```ts
// ✅ 正確
const props = withDefaults(defineProps<{
  label: string
  disabled?: boolean
}>(), {
  disabled: false
})

const emit = defineEmits<{
  click: [value: string]
  update: [id: number, value: string]
}>()
```

---

## TypeScript 規範

- **所有**變數、函式參數、回傳值都要明確標註型別
- 禁止使用 `any`，改用 `unknown` 並做型別收窄
- 優先用 `interface` 定義物件型別，`type` 用於 union / intersection
- 型別定義統一放在 `/types` 資料夾

```ts
// ✅ 正確
interface User {
  id: number
  name: string
  email: string
}

// ❌ 禁止
const data: any = await fetchUser()
```

---

## Composables 規範

- 全部放在 `/composables` 資料夾
- 命名一律以 `use` 開頭，例如 `useAuth.ts`、`useProduct.ts`
- 回傳值要明確標註型別
- 避免在 composable 裡直接操作 DOM

```ts
// composables/useCounter.ts
export function useCounter(initial: number = 0) {
  const count = ref<number>(initial)

  function increment(): void {
    count.value++
  }

  function reset(): void {
    count.value = initial
  }

  return { count: readonly(count), increment, reset }
}
```

---

## API 呼叫規範

- 使用 Nuxt 內建的 `useFetch` 或 `useAsyncData`，**不直接用** `fetch` 或 `axios`
- API base URL 統一從 `useRuntimeConfig()` 取得，**不寫死** URL
- 所有 API 回應都要定義對應的 TypeScript interface
- 錯誤處理要明確

```ts
// ✅ 正確 - 在 composable 或 setup 內
const { data, error, pending } = await useFetch<User>('/api/user', {
  baseURL: useRuntimeConfig().public.apiBase,
})

// ✅ 正確 - 非同步操作場景
const { data } = await useAsyncData<Product[]>('products', () =>
  $fetch('/api/products', {
    baseURL: useRuntimeConfig().public.apiBase,
  })
)
```

```ts
// nuxt.config.ts 設定
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost:3000',
    },
  },
})
```

---

## Pinia Store 規範

- 使用 **Setup Store** 語法（不用 Options Store）
- 每個 store 對應一個功能模組，放在 `/stores` 資料夾
- 命名以 `use` 開頭並加 `Store` 結尾，例如 `useUserStore`
- State 的型別要明確定義

```ts
// stores/useUserStore.ts
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed<boolean>(() => user.value !== null)

  async function fetchUser(id: number): Promise<void> {
    const { data } = await useFetch<User>(`/api/users/${id}`)
    user.value = data.value
  }

  function logout(): void {
    user.value = null
  }

  return { user: readonly(user), isLoggedIn, fetchUser, logout }
})
```

---

## Tailwind CSS 規範

- 優先使用 Tailwind utility class，避免自訂 CSS
- 複雜或重複的樣式組合用 `@apply` 抽成元件 class
- RWD 順序：mobile first，依序加 `sm:` `md:` `lg:` `xl:`
- 禁止使用 inline style（除非動態綁定無法避免）

```vue
<!-- ✅ 正確 -->
<button class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50">
  送出
</button>

<!-- ✅ RWD 正確寫法 -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

---

## 資料夾結構

```
project/
├── assets/          # 靜態資源（圖片、全域 CSS）
├── components/      # 共用元件
│   └── ui/          # 基礎 UI 元件（Button、Input 等）
├── composables/     # 共用 Composable
├── layouts/         # 頁面 Layout
├── middleware/      # Route Middleware
├── pages/           # 頁面（自動生成路由）
├── plugins/         # Nuxt Plugins
├── public/          # 不需處理的靜態檔案
├── server/          # Server API（若有用 Nuxt server routes）
├── stores/          # Pinia Stores
├── types/           # TypeScript 型別定義
│   ├── api.ts       # API 回應型別
│   └── index.ts     # 共用型別
└── utils/           # 純工具函式（不含響應式）
```

---

## 命名規範

| 類型 | 規範 | 範例 |
|------|------|------|
| 元件檔案 | PascalCase | `UserCard.vue` |
| 頁面檔案 | kebab-case | `user-profile.vue` |
| Composable | camelCase + use 前綴 | `useAuth.ts` |
| Store | camelCase + use/Store | `useUserStore.ts` |
| 型別 / Interface | PascalCase | `interface UserResponse` |
| 一般變數 | camelCase | `const userName` |
| 常數 | UPPER_SNAKE_CASE | `const MAX_RETRY = 3` |

---

## 常用指令

```bash
# 開發
npm run dev

# 型別檢查
npx nuxi typecheck

# 建置
npm run build

# 預覽 production build
npm run preview

# 產生 Nuxt 型別
npx nuxi prepare
```

---

## 注意事項

- Nuxt 3 有 **auto-import**，不需要手動 import `ref`、`computed`、`useFetch` 等 Nuxt/Vue 內建功能
- 環境變數一律透過 `useRuntimeConfig()` 存取，**禁止**直接用 `process.env`（client side 無法讀取）
- `useFetch` 只能在 `setup()` 或 Nuxt plugin 中使用；一般函式內改用 `$fetch`
- Server-only 的邏輯（含 secret key）放在 `server/` 資料夾，不要放在 `composables/` 或 `pages/`

import { defineStore } from 'pinia'

// 定义一个存储器来管理 loading 状态
export const useLoadingStore = defineStore('loading', {
  state: () => {
    return {
      isLoading: false,
    }
  },
  actions: {
    // 设置 loading 状态为 true
    startLoading() {
      this.isLoading = true
    },
    // 设置 loading 状态为 false
    stopLoading() {
      this.isLoading = false
    },
  },
})

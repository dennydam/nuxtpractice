import { useFetch } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'
import { useLoadingStore } from '~/stores/index'

function changeLoading() {
  const loadingState = useLoadingStore()
  console.log('changeLoading')
  return loadingState.startLoading
}

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'
const baseUrl = 'http://localhost:3000'
// import { Connection } from 'tedious'

class HttpRequest {
  request<T = any>(url: string, method: Methods, data: any, options: any) {
    return new Promise((resolve, reject) => {
      const newOptions: any = {
        baseURL: baseUrl,
        method: method,
        ...options,
      }

      useFetch(url, newOptions)
        .then((res: any) => {
          console.log('url', url)
          console.log('res', res)
          return res
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }
  // 封装常用方法
  get<T = any>(url: string, params?: any, options?: any) {
    console.log('封裝')
    return this.request(url, 'GET', params, options)
  }

  post<T = any>(url: string, data: any, options?: any) {
    return this.request(url, 'POST', data, options)
  }

  Put<T = any>(url: string, data: any, options?: any) {
    return this.request(url, 'PUT', data, options)
  }

  Delete<T = any>(url: string, params: any, options?: any) {
    return this.request(url, 'DELETE', params, options)
  }
}
console.log('httpRequest')

const httpRequest = new HttpRequest()
export default httpRequest

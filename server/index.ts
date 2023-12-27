import { UseFetchOptions, useFetch } from 'nuxt/app'
type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE'
const baseUrl = 'http://localhost:3000'
class HttpRequest {
  request<T = any>(url: string, method: Methods, data: any, options?: UseFetchOptions<T>) {
    return new Promise((resolve, reject) => {
      const newOptions: UseFetchOptions<T> = {
        baseURL: baseUrl,
        method: method,
        ...options,
      }

      // if (method === 'GET' || method === 'DELETE') {
      //   newOptions.params = data
      // }
      // if (method === 'POST' || method === 'PUT') {
      //   newOptions.body = data
      // }
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
  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    console.log('封裝')
    return this.request(url, 'GET', params, options)
  }

  post<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, 'POST', data, options)
  }

  Put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, 'PUT', data, options)
  }

  Delete<T = any>(url: string, params: any, options?: UseFetchOptions<T>) {
    return this.request(url, 'DELETE', params, options)
  }
}

const httpRequest = new HttpRequest()

export default httpRequest

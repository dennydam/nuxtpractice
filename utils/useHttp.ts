import type { HttpResponse } from '@/api/interface'
import { useLoadingStore } from '~/stores/index'

function changeLoading() {
  const loadingState = useLoadingStore()
  console.log('changeLoading', loadingState)
  loadingState.startLoading()
}

function configOptions(options: any = {}) {
  // options.headers = { 'access-token': getToken() }
  return options
}

/**
 * api请求封装
 * @param { String } url 请求地址
 * @param { Object } options 请求配置项
 */
const fetch = async (url: string, options?: object): Promise<any> => {
  const {
    public: { baseUrl },
  } = useRuntimeConfig()

  console.log('request url', url)
  const reqUrl = 'http://localhost:3000' + url

  // const key = hash(JSON.stringify(options) + url)

  // const _options = configOptions(options)
  // const { data, error, refresh, status } = await useFetch(reqUrl, {
  //   onResponseError({ request, response, options }) {},
  // })

  return new Promise((resolve, reject) => {
    useFetch(reqUrl, {
      ...options,
      onRequest({ request }) {
        const loadingState = useLoadingStore()
        console.log('changeLoading', loadingState)
        loadingState.startLoading()
      },
      onResponseError({ request, response, options }) {
        const loadingState = useLoadingStore()
        console.log('onResponseError')
        loadingState.stopLoading()
        console.log('请求失败', response.status, options)
        reject(response)
      },
    })
      .then(({ data, error, refresh, status }) => {
        // 强制刷新数据，避免重复请求
        const loadingState = useLoadingStore()
        console.log('onResponseError')
        loadingState.stopLoading()
        console.log('userFetch計算次數')
        // refresh()
        if (error.value) {
          console.log('请求失败', status)
          reject(error.value)
          return
        }
        const dataValue: any = data.value

        // 请求成功 200
        console.log('dataValue', data.value)
        if (dataValue) {
          console.log('请求成功', dataValue)
          resolve(dataValue)
        } else {
          // 请求失败
          console.log('请求失败', dataValue)
          const e = {
            code: dataValue?.code,
          }
          // checkStatus(e.code as number)
        }
      })
      .catch((err: any) => {
        console.log('请求失败', err)
        reject(err)
      })
  })

  // return new Promise((resolve, reject) => {
  //   useFetch(reqUrl, options).onResponseError(({ request, response, options }) => {

  //   })
  //     .then(({ data, error, refresh, status }) => {
  //       // 强制刷新数据，避免重复请求
  //       console.log('userFetch計算次數')
  //       // refresh()
  //       if (error.value) {
  //         console.log('请求失败', status)
  //         reject(error.value)
  //         return
  //       }
  //       const dataValue: any = data.value

  //       // 请求成功 200
  //       console.log('dataValue', data.value)
  //       if (dataValue) {
  //         console.log('请求成功', dataValue)
  //         resolve(dataValue)
  //       } else {
  //         // 请求失败
  //         console.log('请求失败', dataValue)
  //         const e = {
  //           code: dataValue?.code,
  //         }
  //         // checkStatus(e.code as number)
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.log('请求失败', err)
  //       reject(err)
  //     })
  // })
}

export default new (class Http {
  get<T>(url: string, params?: object): Promise<HttpResponse<T>> {
    return fetch(url, { method: 'get', params })
  }

  post<T>(url: string, body?: object): Promise<HttpResponse<T>> {
    return fetch(url, { method: 'post', body })
  }

  put<T>(url: string, body?: object): Promise<HttpResponse<T>> {
    return fetch(url, { method: 'put', body })
  }

  delete<T>(url: string, body?: object): Promise<HttpResponse<T>> {
    return fetch(url, { method: 'delete', body })
  }
})()

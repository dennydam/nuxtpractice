// import { hash } from 'ohash'
// import { checkStatus } from '@/api/helper/checkStatus'
// import { getToken } from '@/api/user'
import type { HttpResponse } from '@/api/interface'
import { useLoadingStore } from '~/stores/index'

function changeLoading() {
  const loadingState = useLoadingStore()
  console.log('changeLoading', loadingState)
  loadingState.startLoading()
}

// 请求体拓展
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

  // baseUrl 在生产环境中拿不到，暂时不知道什么原因，这里做一下兼容处理
  // const _baseUrl = baseUrl ?? 'https://mock.mengxuegu.com/mock/63eb40404b99657e29850a49'
  console.log('request url', url)
  const reqUrl = 'http://localhost:3000' + url

  // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求

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

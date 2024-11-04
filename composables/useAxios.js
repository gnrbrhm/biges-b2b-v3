import axios from 'axios'
import Qs from 'qs'
import { useRuntimeConfig, useNuxtApp, useAuthStore } from '#app'

export const useAxios = () => {
  const config = useRuntimeConfig()
  const { $openReplay } = useNuxtApp() // Nuxt'te OpenReplay'e erişim
  const authStore = useAuthStore()

  // Axios örneği oluştur
  const axiosInstance = axios.create({
    baseURL: config.public.baseURL, // Projenize uygun baseURL
    paramsSerializer: params => Qs.stringify(params, { skipNulls: true, arrayFormat: 'repeat' })
  })

  // İstek interceptor
  axiosInstance.interceptors.request.use(request => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Making request to ' + request.url)
    }

    return request
  })

  // Hata interceptor
  axiosInstance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const { config, response } = error
      const data = response?.data
      const status = response?.status

      if (process.env.NODE_ENV !== 'production') {
        console.log('@Request Error:', status, config?.url, data?.message)
      }

      // OpenReplay ile hatayı izlemek
      if (response) {
        $openReplay.handleError(error) // OpenReplay'de hatayı logla
      }

      // Kullanıcı oturum bilgilerini izlemek
      if (authStore.loggedIn) {
        $openReplay.setUserID(authStore.user.email) // Kullanıcı email adresini izlemek
      }

      // Hata yönetimi
      let messages = null
      if (data?.messages) {
        messages = Object.entries(data.messages).map(([key, value]) => `${value}`)
      }

      if (messages) {
        notify({
          title: 'Uyarı',
          text: messages.join('</br>') || 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
          type: 'warn',
          duration: 10000
        })
      } else {
        notify({
          title: 'Uyarı',
          text: data?.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
          type: 'warn',
          duration: 10000
        })
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

interface IRequestConfig extends AxiosRequestConfig {
  onFailure?: (error: AxiosError) => void
  onSuccess?: (response: AxiosResponse) => void
}

const refreshSubscribers: Array<(token: string) => void> = []
let failuredRequests: Array<IRequestConfig> = []
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token))
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError | unknown) => {
    const originalRequest = (error as AxiosError).config as IRequestConfig
    if (error instanceof AxiosError && error.status === 401) {
      if (
        error?.response?.data &&
        error?.response?.data?.code === 'token.expired'
      ) {
        try {
          const refreshToken = localStorage.getItem('refreshToken')
          const { data } = await api.post('/users/refresh', {
            refreshToken,
          })
          localStorage.setItem('token', data.token)
          localStorage.setItem('refreshToken', data.refreshToken)

          onRefreshed(data.token)

          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.token}`
          }

          return axios(originalRequest)
        } catch (error) {
          console.log(error)
          failuredRequests.forEach((request) => {
            request.onFailure?.(error as AxiosError)
          })
          failuredRequests = []
        }
      }
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }

    return Promise.reject(error)
  }
)

export { api }

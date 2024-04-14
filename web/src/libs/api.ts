import axios, { InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => ({
  ...config,
  params: { ...config.params, api_key: import.meta.env.VITE_SERVER_KEY },
}))

export default api

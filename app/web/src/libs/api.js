import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    Authorization: localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth')).token
      : null,
  },
})

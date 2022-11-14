import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://images-backend-production.up.railway.app',
})

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.headers!.Authorization = window.localStorage.getItem('token')
  }
  return config
})

export default instance

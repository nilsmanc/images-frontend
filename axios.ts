import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://images-backend-production.up.railway.app',
  //baseURL: 'https://images-backend-production.up.railway.app' || 'http://localhost:4444',
})

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.headers!.Authorization = window.localStorage.getItem('token')
  }
  return config
})
export default instance

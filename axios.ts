import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://images-zjx1.onrender.com',
})

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.headers!.Authorization = window.localStorage.getItem('token')
  }
  return config
})

export default instance

import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.headers!.Authorization = window.localStorage.getItem('token')
  }
  return config
})
export default instance

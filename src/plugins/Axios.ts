import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

service.interceptors.request.use(
  (config) => {
    // 在這裡加入您的邏輯
    return config
  },
  (error) => {
    // 在這裡加入您的邏輯
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    // 在這裡加入您的邏輯
    return response
  },
  (error) => {
    // 在這裡加入您的邏輯
    return Promise.reject(error)
  }
)

export default service

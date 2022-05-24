import axios from 'axios'

// 导入 Nprogress
import NProgress from 'nprogress'

// 接口地址
axios.defaults.baseURL = 'https://autumnfish.cn/'

// 添加 请求头 和 进度条 NProgress.start()
axios.interceptors.request.use((config) => {
  NProgress.start()

  return config
})

axios.interceptors.response.use((config) => {
  NProgress.done()

  return config
})

export default axios

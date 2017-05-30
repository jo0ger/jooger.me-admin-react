import axios from 'axios'
import { message } from 'antd'

const isProd = process.env.NODE_ENV === 'production'

export const instance = axios.create({
  baseURL: !isProd ? 'http://localhost:5000/v1' : 'http://api.jooger.com/v1',
  timeout: 5000
})

const code = {
  FAILED: -1,
  SUCCESS: 0,
  UNAUTHORIZED: 401
}

instance.interceptors.request.use(config => {
  config.params = config.params || {}
  if (!isProd) {
    config.params._DEV_ = true
  }
  return config
})

instance.interceptors.response.use(response => {
  if (!response || !response.data) {
    // TODO 提示服务器异常
    message.error('服务器异常')
  }
  switch (response.data.code) {
    case code.UNAUTHORIZED:
      message.warning('禁地勿闯！！！')
      break
    case code.FAILED:
      message.error(response.data.message)
      break
    case code.SUCCESS:
      if (response.config.method.toLocaleUpperCase() !== 'GET') {
        message.success(response.data.message)
      }
      break
    default:
      break
  }
  return response.data
}, error => {
  let status = error.response.status
  message.error('请求错误' + (status ? `，code:${status}` : ''))
  return error.response
})

const wrap = (type, url) => (params = {}) => instance[type](url, params)

const Service = {
  auth: {
    login: wrap('post', '/auth'),
    getInfo: wrap('get', '/auth'),
    editInfo: wrap('put', '/auth')
  },
  stat: {
    getStat: wrap('get', '/statistics')
  },
  article: {
    getList: wrap('get', '/article'),
    create: wrap('post', '/article'),
    batchUpdate: wrap('patch', '/article'),
    batchDelete: wrap('delete', '/article'),
    getItem: id => wrap('get', `/article/${id}`),
    editItem: id => wrap('put', `/article/${id}`),
    changeItemState: id => wrap('patch', `/article/${id}`),
    deleteItem: id => wrap('delete', `/article/${id}`)
  },
  category: {
    getList: wrap('get', '/category'),
    create: wrap('post', '/category'),
    batchDelete: wrap('delete', '/category'),
    getItem: id => wrap('get', `/category/${id}`),
    editItem: id => wrap('put', `/category/${id}`),
    deleteItem: id => wrap('delete', `/category/${id}`)
  },
  tag: {
    getList: wrap('get', '/tag'),
    create: wrap('post', '/tag'),
    batchDelete: wrap('delete', '/tag'),
    getItem: id => wrap('get', `/tag/${id}`),
    editItem: id => wrap('put', `/tag/${id}`),
    deleteItem: id => wrap('delete', `/tag/${id}`)
  },
  option: {
    getInfo: wrap('get', '/option'),
    create: wrap('post', '/option'),
    editInfo: wrap('put', '/option'),
  }
}

export default Service

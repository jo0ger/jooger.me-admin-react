import axios from 'axios'

const isProd = process.env.NODE_ENV === 'production'

const instance = axios.create({
  baseURL: !isProd ? 'http://localhost:5000/v1' : 'http://api.jooger.com/v1',
  timeout: 5000
})

const code = {
  FAILED: -1,
  SUCCESS: 0,
  UNAUTHORIZED: 401
}

instance.interceptors.response.use(response => {
  if (!response || !response.data) {
    // TODO 提示服务器异常
  }
  switch (response.data.code) {
    case code.UNAUTHORIZED:
      // app.$notify.error('禁地勿闯！！！')
      break
    case code.FAILED:
      // app.$notify.error(response.data.message)
      break
    case code.SUCCESS:
      if (response.config.method.toLocaleUpperCase() !== 'GET') {
        // app.$notify.success(response.data.message)
      }
      break
    default:
      break
  }
  return response.data
}, error => {
  // let status = error.response.status
  // app.$notify.error('请求错误' + (status ? `，code:${status}` : ''))
  return error.response
})

const wrap = (type, url) => (params = {}) => instance[type](url, { params })

const service = {
  auth: {
    login: wrap('post', '/auth'),
    getInfo: wrap('get', '/auth'),
    modifyInfo: wrap('put', '/auth')
  },
  article: {
    getList: wrap('get', '/article'),
    publish: wrap('post', '/article'),
    batchUpdate: wrap('patch', '/article'),
    batchDelete: wrap('delete', '/article'),
    getItem: id => wrap('get', `/article/${id}`),
    modifyItem: id => wrap('put', `/article/${id}`),
    deleteItem: id => wrap('delete', `/article/${id}`)
  },
  category: {
    getList: wrap('get', '/category'),
    create: wrap('post', '/category'),
    batchDelete: wrap('delete', '/category'),
    getItem: id => wrap('get', `/category/${id}`),
    modifyItem: id => wrap('put', `/category/${id}`),
    deleteItem: id => wrap('delete', `/category/${id}`)
  },
  tag: {
    getList: wrap('get', '/tag'),
    create: wrap('post', '/tag'),
    batchDelete: wrap('delete', '/tag'),
    getItem: id => wrap('get', `/tag/${id}`),
    modifyItem: id => wrap('put', `/tag/${id}`),
    deleteItem: id => wrap('delete', `/tag/${id}`)
  },
  option: {
    getInfo: wrap('get', '/option'),
    create: wrap('post', '/option'),
    modifyInfo: wrap('put', '/option'),
  }
}

export default service

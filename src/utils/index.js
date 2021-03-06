import classnames from 'classnames'
import marked from './marked'
import qiniuRequest from './qiniuUpload'
import * as commentMetaParser from './commentMetaParser'
import * as storage from './storage'

export const debounce = (fn, delta = 0, immediate = false) => {
  let can = true
  let timer = null
  return function () {
    if (immediate) {
      if (can) {
        fn.call(this, ...arguments)
        can = false
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        can = true
      }, parseInt(delta, 10))
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(this, ...arguments)
      }, parseInt(delta, 10))
    }
  }
}

/**
 * 将时间输出为统一的格式
 * @param fmt  yyyy-MM-dd hh:mm:ss:S q
 * @returns {*}
 */
export const fmtDate = (date, fmt = 'yyyy-MM-dd hh:mm') => {
  date = new Date(date)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 连字符转驼峰
export const hyphenToHump = (str = '') => {
  return str.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
export const humpToHyphen = (str) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 首字母大写
export const firstUpperCase = (str) => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

export const isType = (obj = {}, type = 'object') => {
  return Object.prototype.toString.call(obj) === `[object ${firstUpperCase(type)}]`
}

export const noop = function () {}

export const buildClassName = (className = '') => {
  let obj = {}
  isType(className, 'object')
    ? (obj = {...className})
    : isType(className, 'array')
      ? className.forEach(item => obj[item] = true)
      : (obj = { [className]: true })
  return obj
}

// shallow copy
export const copy = function (out = {}) {
  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i]

    if (!obj) {
      continue
    }
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        out[key] = obj[key]
      }
    }
  }
  return out
}

// deep copy
export const deepCopy = function (out = {}) {
  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i]

    if (!obj) {
      continue
    }

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          out[key] = deepCopy(out[key], obj[key])
        } else {
          out[key] = obj[key]
        }
      }
    }
  }
  return out
}

export const findExtendsItemValue = (extendsList = [], key = '') => {
  const matchedItem = extendsList.find(item => item.key === key)
  return matchedItem ? matchedItem.value : null
}

export {
  classnames,
  marked,
  qiniuRequest,
  commentMetaParser,
  storage
}

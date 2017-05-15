import classnames from 'classnames'

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

module.exports = {
  classnames,
  debounce,
  hyphenToHump,
  humpToHyphen,
  fmtDate
}
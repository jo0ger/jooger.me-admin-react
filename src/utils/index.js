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
  humpToHyphen
}
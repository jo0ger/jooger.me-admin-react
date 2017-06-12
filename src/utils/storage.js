export const JOOGER_USER = 'JOOGER_USER'
export const JOOGER_USER_LIKE_HISTORY = 'JOOGER_USER_LIKE_HISTORY'

export const setStorageItem = (key = '', value = '') => {
  key && window.localStorage.setItem(key, value)
}

export const getStorageItem = (key = '') => {
  return key && window.localStorage.getItem(key)
}

export const removeStorageItem = (key = '') => {
  key && window.localStorage.removeItem(key)
}

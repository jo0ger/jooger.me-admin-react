export const JOOGER_ADMIN_THEME = 'JOOGER_ADMIN_THEME'
export const JOOGER_ADMIN_SIDER_FOLD = 'JOOGER_ADMIN_SIDER_FOLD'
export const JOOGER_ADMIN_NAVOPENKEYS = 'JOOGER_ADMIN_NAVOPENKEYS'

export const setStorageItem = (key = '', value = '') => {
  key && window.localStorage.setItem(key, value)
}

export const getStorageItem = (key = '') => {
  return key && window.localStorage.getItem(key)
}

export const removeStorageItem = (key = '') => {
  key && window.localStorage.removeItem(key)
}

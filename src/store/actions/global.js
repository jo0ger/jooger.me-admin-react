import { storage } from '~config'

const {
  JOOGER_ADMIN_THEME,
  JOOGER_ADMIN_SIDER_FOLD,
  setStorageItem
} = storage

// Sider
export const TOGGLE_SIDER = 'TOGGLE_SIDER'
export const CHANGE_THEME = 'CHANGE_THEME'
export const TOGGLE_NAVBAR = 'TOGGLE_NAVBAR'

export const toggleSider = fold => {
  setStorageItem(JOOGER_ADMIN_SIDER_FOLD, fold ? 1 : 0)
  return {
    type: TOGGLE_SIDER,
    fold
  }
}

export const changeTheme = themeName => {
  setStorageItem(JOOGER_ADMIN_THEME, themeName)
  return {
    type: CHANGE_THEME,
    themeName
  }
}

export const toggleNavbar = isNavbar => {
  return {
    type: TOGGLE_NAVBAR,
    isNavbar
  }
}

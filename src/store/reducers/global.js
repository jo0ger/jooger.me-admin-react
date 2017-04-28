import { storage } from '~config'
import {
  TOGGLE_SIDER,
  CHANGE_THEME,
  TOGGLE_NAVBAR
} from '~actions/global'


const {
  JOOGER_ADMIN_THEME,
  JOOGER_ADMIN_SIDER_FOLD,
  getStorageItem
} = storage

const globalDefault = {
  sider: {
    fold: getStorageItem(JOOGER_ADMIN_SIDER_FOLD) === '1' || false,
    theme: getStorageItem(JOOGER_ADMIN_THEME) || 'dark'
  },
  header: {
    isNavbar: document.body.clientWidth < 762,
    menuPopoverVisible: false
  },
  auth: {
    isLogin: false,
    loginButtonLoading: false
  }
}

const global = (state = globalDefault, action) => {
  switch (action.type) {
    case TOGGLE_SIDER:
      return {
        ...state,
        sider: {
          ...state.sider,
          fold: action.fold
        }
      }
    case CHANGE_THEME:
      return {
        ...state,
        sider: {
          ...state.sider,
          theme: action.themeName
        }
      }
    case TOGGLE_NAVBAR:
      return {
        ...state,
        header: {
          ...state.header,
          isNavbar: action.isNavbar
        }
      }
    default:
      return state
  }
}

export default global

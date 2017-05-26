import { combineReducers } from 'redux'
import articleReducer from './article'

export const makeRootReducer = (asyncReducers = {}) => {
  return combineReducers({
    article: articleReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { name, reducer }) => {
  store.asyncReducers[name] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

import { combineReducers } from 'redux'

export const makeRootReducer = (asyncReducers = {}) => {
  return combineReducers({
    ...asyncReducers
  })
}

export const injectReducer = (store, { name, reducer }) => {
  store.asyncReducers[name] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

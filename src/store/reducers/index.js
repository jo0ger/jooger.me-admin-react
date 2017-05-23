import { combineReducers } from 'redux'
import categoryReducer from './category'
import tagReducer from './tag'

export const makeRootReducer = (asyncReducers) => {
  const c = {
    category: categoryReducer,
    tag: tagReducer,
    ...asyncReducers
  }
  console.log(c)
  return combineReducers(c)
}

export const injectReducer = (store, { name, reducer }) => {
  store.asyncReducers[name] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

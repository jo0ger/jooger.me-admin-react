import { combineReducers } from 'redux'
import categoryReducer from './category'
import tagReducer from './tag'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    category: categoryReducer,
    tag: tagReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { name, reducer }) => {
  store.asyncReducers[name] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

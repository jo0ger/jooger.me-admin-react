// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import articleReducer from './article'
import categoryReducer from './category'
import tagReducer from './tag'

export const makeRootReducer = (asyncReducers = {}) => {
  return combineReducers({
    article: articleReducer,
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

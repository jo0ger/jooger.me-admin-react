import { combineReducers } from 'redux'
import locationReducer from './location'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { name, reducer }) => {
  store.asyncReducers[name] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

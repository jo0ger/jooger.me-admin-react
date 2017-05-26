import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import makeRootReducer from './reducers'

export const createStoreWithMiddleware = (initialState = {}) => {
  const middleWare = [
    thunk
  ]
  const enhanders = []
  if (__DEV__) {
    const DevTools = require('~components/DevTools').default
    enhanders.push(DevTools.instrument())
    middleWare.push(createLogger())
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleWare),
      ...enhanders
    )
  )

  store.asyncReducers = {}

  return store
}

export default createStoreWithMiddleware

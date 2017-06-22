import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Immutable from 'immutable'
import makeRootReducer from './reducers'

export const createStoreWithMiddleware = (initialState = Immutable.Map()) => {
  const middleWare = [
    thunk
  ]
  const enhanders = []
  if (__DEV__) {
    // const DevTools = require('~components/DevTools').default
    // enhanders.push(DevTools.instrument())

    if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      enhanders.push(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__())
    }
    
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

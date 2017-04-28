import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers'
import DevTools from '~components/DevTools'

export default function createStoreWithMiddleware (initialState) {
  const middleware = [thunk]
  const enhancers = compose(
    applyMiddleware(...middleware)
  )
  return createStore(rootReducers, initialState, enhancers)
}

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers'
import DevTools from '~components/common/DevTools'

export default function createStoreWithMiddleware (initialState) {
  const middleware = [thunk]
  const enhancers = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
  )
  return createStore(rootReducers, initialState, enhancers)
}

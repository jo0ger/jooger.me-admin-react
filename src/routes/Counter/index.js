import { injectReducer } from '~store/reducers'
import counterReducer from './modules/counter'
import loadCounterContainer from 'bundle-loader?lazy!./containers/CounterContainer'

export default (store) => {
  injectReducer(store, { name: 'counter', reducer: counterReducer })
  return loadCounterContainer
}

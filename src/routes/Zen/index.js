import { injectReducer } from '~store/reducers'
import zenReducer from './modules/zen'
import loadZenContainer from 'bundle-loader?lazy!./containers/ZenContainer'

export default (store) => {
  injectReducer(store, { name: 'zen', reducer: zenReducer })
  return loadZenContainer
}

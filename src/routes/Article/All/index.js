import { injectReducer } from '~store/reducers'
import articleReducer from './modules/article'
import loadAllArticlesContainer from 'bundle-loader?lazy!./containers/AllArticlesContainer'

export default (store) => {
  injectReducer(store, { name: 'article', reducer: articleReducer })
  return loadAllArticlesContainer
}

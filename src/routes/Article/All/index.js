import { injectReducer } from '~store/reducers'
import articleReducer from './modules/articleList'
import loadAllArticlesContainer from 'bundle-loader?lazy!./containers/AllArticlesContainer'

export default (store) => {
  injectReducer(store, { name: 'articleList', reducer: articleReducer })
  return loadAllArticlesContainer
}

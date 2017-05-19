import { injectReducer } from '~store/reducers'
import articleListReducer from './modules/articleList'
import loadAllArticlesContainer from 'bundle-loader?lazy!./containers/AllArticlesContainer'

export default (store) => {
  injectReducer(store, { name: 'articleList', reducer: articleListReducer })
  return loadAllArticlesContainer
}

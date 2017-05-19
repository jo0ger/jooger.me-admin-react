import { injectReducer } from '~store/reducers'
import loadArticleEdit from 'bundle-loader?lazy!./containers/ArticleEditContainer'
import articleEditReducer from './modules/articleEdit'

export default store => {
  injectReducer(store, { name: 'articleDetail', reducer: articleEditReducer })
  return loadArticleEdit
}

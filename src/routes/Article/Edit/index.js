import { injectReducer } from '~store/reducers'
import loadArticleEdit from 'bundle-loader?lazy!./containers/ArticleEditContainer'
import articleEditReducer from './modules/articleEdit'

export default store => {
  return {
    load: loadArticleEdit,
    preload: load => injectReducer(store, {
      name: 'articleDetail',
      reducer: articleEditReducer
    })
  }
}

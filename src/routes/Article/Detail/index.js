// import { injectRedecer } from '~store/reducers'
import loadArticleDetail from 'bundle-loader?lazy!./containers/ArticleDetailContainer'

export default store => {
  return loadArticleDetail
}

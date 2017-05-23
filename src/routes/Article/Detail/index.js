import loadArticleDetail from 'bundle-loader?lazy!./containers/ArticleDetailContainer'

export default store => {
  return {
    load: loadArticleDetail
  }
}

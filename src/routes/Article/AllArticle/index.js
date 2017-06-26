import loadAllArticle from 'bundle-loader?lazy!./containers/AllArticleContainer'

export default store => ({
  load: loadAllArticle
})

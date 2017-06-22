import { connect } from 'react-redux'
import ArticleDetail from '../components/ArticleDetail'
import { editArticleItem, editArticleSuccess } from '~store/reducers/article'

const mapStateToProps = state => {
  const { article, category, tag } = state.toJS()
  const { currentArticleId, list, saving } = article
  return {
    currentArticle: list.find(item => item._id === currentArticleId) || {},
    saving,
    categoryList: category.list,
    categoryFetching: category.fetching,
    tagList: tag.list,
    tagFetching: tag.fetching
  }
}

const mapDispatchToProps = {
  editArticleItem,
  editArticleSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)

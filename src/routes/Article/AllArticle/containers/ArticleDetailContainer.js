import { connect } from 'react-redux'
import ArticleDetail from '../components/ArticleDetail'
import { editArticleItem } from '~store/reducers/article'

const mapStateToProps = state => {
  const { article, category, tag } = state
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
  editArticleItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)

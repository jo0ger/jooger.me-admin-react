import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AllArticle from '../components/AllArticle'
import { fetchArticleList, editArticleItem, deleteArticleItem, viewArticleItem } from '~store/reducers/article'
import { fetchCategoryList } from '~store/reducers/category'
import { fetchTagList } from '~store/reducers/tag'

const mapStateToProps = state => {
  const { list, pagination, refreshing, fetching, saving, deleting, currentArticleId } = state.article
  return {
    articleList: list,
    pagination,
    refreshing,
    fetching,
    saving,
    deleting,
    currentArticleId
  }
}

const mapDispatchToProps = {
  fetchArticleList,
  editArticleItem,
  deleteArticleItem,
  viewArticleItem,
  fetchCategoryList,
  fetchTagList
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllArticle))

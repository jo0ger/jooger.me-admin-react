import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AllArticle from '../components/AllArticle'
import { fetchArticleList, editArticleItem, deleteArticleItem, viewArticleItem } from '~store/reducers/article'

const mapStateToProps = state => {
  const { list, pagination, refreshing, fetching, saving, deleting, currentId } = state.article
  return {
    articleList: list,
    pagination,
    refreshing,
    fetching,
    saving,
    deleting,
    currentId
  }
}

const mapDispatchToProps = {
  fetchArticleList,
  editArticleItem,
  deleteArticleItem,
  viewArticleItem
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllArticle))

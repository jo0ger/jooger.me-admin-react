import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchList, editArticle, deleteArticle } from '../modules/articleList'
import ArticleList from '../components/ArticleList'

const mapState2Props = state => {
  const { fetching, editing, deleting, data, pagination, filter, sorter } = state.articleList
  return {
    listFetching: fetching,
    listEditing: editing,
    listDeleting: deleting,
    articleList: data,
    pagination,
    filter,
    sorter
  }
}

const mapDispatch2Props = {
  fetchArticleList: fetchList,
  editArticle,
  deleteArticle
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(ArticleList))

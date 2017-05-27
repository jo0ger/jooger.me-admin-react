import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AllArticle from '../components/AllArticle'
import { fetchArticleList, deleteArticleItem, viewArticleItem } from '~store/reducers/article'

const mapStateToProps = state => {
  const { list, pagination, filter, sorter, fetching, saving, deleting, currentId } = state.article
  return {
    articleList: list,
    pagination,
    filterInfo: filter,
    sorterInfo: sorter,
    fetching,
    saving,
    deleting,
    currentId
  }
}

const mapDispatchToProps = {
  fetchArticleList,
  deleteArticleItem,
  viewArticleItem
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllArticle))

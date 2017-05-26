import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AllArticle from '../components/AllArticle'
import { fetchArticleList, deleteArticleItem } from '~store/reducers/article'

const mapStateToProps = state => {
  const { list, pagination, filter, sorter, fetching, saving, deleting } = state.article
  return {
    articleList: list,
    pagination,
    filterInfo: filter,
    sorterInfo: sorter,
    fetching,
    saving,
    deleting
  }
}

const mapDispatchToProps = {
  fetchArticleList,
  deleteArticleItem
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllArticle))

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchList, editArticle } from '../modules/article'
import AllArticles from '../components/AllArticles'

const mapState2Props = state => {
  const { fetching, editing, data, pagination, filter, sorter } = state.article.list
  console.log(state.article.list)
  return {
    listFetching: fetching,
    listEditing: editing,
    articleList: data,
    pagination,
    filter,
    sorter
  }
}

const mapDispatch2Props = {
  fetchArticleList: fetchList,
  editArticle
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(AllArticles))

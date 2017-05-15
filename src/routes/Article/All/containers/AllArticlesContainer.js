import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchList } from '../modules/article'
import AllArticles from '../components/AllArticles'

const mapState2Props = state => {
  const { fetching, data, pagination } = state.article.list
  return {
    listFetching: fetching,
    articleList: data,
    pagination
  }
}

const mapDispatch2Props = {
  fetchArticleList: fetchList
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(AllArticles))

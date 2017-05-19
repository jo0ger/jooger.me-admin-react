import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ArticleEdit from '../components/ArticleEdit'
import { fetchArticleDetail } from '../modules/articleEdit'

const mapState2Props = state => {
  const { data, fetching, saving } = state.articleDetail
  return {
    articleDetail: data,
    detailFetching: fetching,
    detailSaving: saving
  }
}

const mapDispatch2Props = {
  fetchArticleDetail
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(ArticleEdit))

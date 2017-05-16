import { connect } from 'react-redux'
import { fetchList, editArticle } from '../modules/article'
import AllArticles from '../components/AllArticles'

const mapState2Props = state => {
  const { data, filter, sorter, pagination } = state.article.list
  return {
    articleList: data,
    filter,
    sorter,
    pagination
  }
}

const mapDispatch2Props = {
  fetchArticleList: fetchList,
  editArticle
}

export default connect(mapState2Props, mapDispatch2Props)(AllArticles)

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ArticleEdit from '../components/ArticleEdit'
import { fetchCategoryList } from '~store/reducers/category'
import { fetchTagList } from '~store/reducers/tag'
import { fetchArticleDetail } from '../modules/articleEdit'

const mapState2Props = state => {
  const { category, tag, articleDetail } = state
  const { data, fetching, saving } = articleDetail
  return {
    articleDetail: data,
    detailFetching: fetching,
    detailSaving: saving,
    categoryList: category.data,
    categoryFetching: category.fetching,
    categorySaving: category.saving,
    tagList: tag.data,
    tagFetching: tag.fetching,
    tagSaving: tag.saving
  }
}

const mapDispatch2Props = {
  fetchCategoryList,
  fetchTagList,
  fetchArticleDetail
}

export default connect(mapState2Props, mapDispatch2Props)(withRouter(ArticleEdit))

import { connect } from 'react-redux'
import Sider from './Sider'
import { createArticleItem } from '~store/reducers/article'

const mapStateToProps = state => {
  const articleCreating = state.article.creating
  return {
    articleCreating
  }
}

const mapDispatchToProps = {
  createArticleItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Sider)

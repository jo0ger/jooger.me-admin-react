import { connect } from 'react-redux'
import Sider from './Sider'
import { createArticleItem } from '~store/reducers/article'

const mapStateToProps = state => {
  return {
    articleCreating: state.getIn(['article', 'creating'])
  }
}

const mapDispatchToProps = {
  createArticleItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Sider)

import { connect } from 'react-redux'
import AllCategory from '../components/AllCategory'
import { fetchCategoryList, createCategoryItem, deleteCategoryItem } from '~store/reducers/category'

const mapStateToProps = state => {
  const { fetching, creating, saving, list } = state.get('category').toJS()
  return {
    fetching,
    saving,
    creating,
    categoryList: list
  }
}

const mapDispatchToProps = {
  fetchCategoryList,
  createCategoryItem,
  deleteCategoryItem
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategory)

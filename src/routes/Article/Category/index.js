import loadCategory from 'bundle-loader?lazy!./containers/AllCategoryContainer'

export default store => ({
  load: loadCategory
})

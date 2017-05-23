import { injectReducer } from '~store/reducers'
import articleListReducer from './modules/articleList'

export default (store) => {
  return {
    load: require('bundle-loader?lazy!./containers/AllArticlesContainer'),
    preload: () => {
      injectReducer(store, { name: 'articleList', reducer: articleListReducer })
    }
  }
}

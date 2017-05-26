import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from '~components/Page'
import ListFilter from '~components/ListFilter'
import ArticleList from './ArticleList'
import styles from '../assets/AllArticle.styl'

const sorterMenus = [
  { key: 'create_at', name: '创建时间' },
  { key: 'update_at', name: '修改时间' }
]

export class AllArticle extends Component {

  state = {
    searchText: ''
  }

  componentWillMount () {
    this._init()
  }

  _init () {
    const { articleList, fetchArticleList } = this.props
    if (articleList && articleList.length) {
      return
    }
    fetchArticleList()
  }

  handlerSorterMenuClick = () => {}

  handlerSearch = (val) => {}

  handleFilterInput = (val) => {}

  render () {
    const { articleList, pagination } = this.props
    return (
      <Page className={styles.page_all_article}>
        <div className={styles.list_view}>
          <ListFilter
            sorterMenus={sorterMenus}
            onMenuClick={this.handlerSorterMenuClick}
            OnInput={this.handleFilterInput}
            onSearch={this.handlerSearch}
          />
          <div className={styles.list_content}>
            <ArticleList
              articleList={articleList}
              pagination={pagination}
            />
          </div>
        </div>
        <div className={styles.detail_view}></div>
      </Page>
    )
  }
}

AllArticle.propTypes = {
  articleList: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  filterInfo: PropTypes.object.isRequired,
  sorterInfo: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  deleting: PropTypes.bool.isRequired,
  fetchArticleList: PropTypes.func.isRequired,
  deleteArticleItem: PropTypes.func.isRequired
}

export default AllArticle

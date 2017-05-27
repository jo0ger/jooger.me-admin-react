import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from '~components/Page'
import ListFilter from '~components/ListFilter'
import ArticleList from './ArticleList'
import InfiniteScroll from '~components/InfiniteScroll'
import styles from '../assets/AllArticle'

const sorterMenus = [
  { key: 'create_at', name: '创建时间' },
  { key: 'update_at', name: '修改时间' }
]

export class AllArticle extends Component {

  state = {
    searchText: ''
  }

  componentWillMount () {
    this.init()
  }

  init () {
    const { articleList, fetchArticleList } = this.props
    if (articleList && articleList.length) {
      return
    }
    fetchArticleList()
  }

  setListContainer = el => this._listContainer = el

  handlerSorterMenuClick = () => {}

  handlerSearch = (val) => {}

  handleFilterInput = (val) => {}

  handleLoadmore = e => {
    const { fetchArticleList, pagination } = this.props
    fetchArticleList({
      page: pagination.current_page + 1
    })
  }

  render () {
    const { articleList, pagination, currentId } = this.props
    return (
      <Page customClassName={styles.page_all_article}>
        <div className={styles.list_view}>
          <ListFilter
            sorterMenus={sorterMenus}
            onMenuClick={this.handlerSorterMenuClick}
            OnInput={this.handleFilterInput}
            onSearch={this.handlerSearch}
          />
          <InfiniteScroll
            customClassName={[styles.list_content]}
            onLoadmore={this.handleLoadmore}
          >
            <ArticleList
              articleList={articleList}
              pagination={pagination}
              currentId={currentId}
              onItemSelected={this.props.viewArticleItem}
            />
          </InfiniteScroll>
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
  deleteArticleItem: PropTypes.func.isRequired,
  viewArticleItem: PropTypes.func.isRequired
}

export default AllArticle

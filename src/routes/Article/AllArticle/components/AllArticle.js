import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from '~components/Page'
import ListFilter from '~components/ListFilter'
import ArticleList from './ArticleList'
import ArticleDetail from '../containers/ArticleDetailContainer'
import InfiniteScroll from '~components/InfiniteScroll'
import NoData from '~components/NoData'
import { Loading, ListReFreshLoading } from '~components/Loading'
import styles from '../assets/AllArticle'

const sorterMenus = [
  { key: 'create_at-1', name: '创建时间（最新优先）' },
  { key: 'create_at+1', name: '创建时间（最早优先）' },
  { key: 'update_at-1', name: '更新时间（最新优先）' },
  { key: 'update_at+1', name: '更新时间（最早优先）' }
]

export class AllArticle extends Component {

  state = {
    searchText: '',
    sorter: {},
    selectedSorterKeys: ['create_at-1']
  }

  componentWillMount () {
    this.init()
  }

  init () {
    const { articleList, fetchArticleList, fetchCategoryList, fetchTagList } = this.props
    if (articleList && articleList.length) {
      return
    }
    fetchArticleList({}, true)
    fetchCategoryList()
    fetchTagList()
  }

  setListContainer = el => this._listContainer = el

  getCurrentArticle = () => this.props.articleList.find(item => item._id === this.props.currentArticleId) || {}

  handleSorterMenuClick = (item) => {
    const { viewArticleItem, fetchArticleList } = this.props
    let sort = {}
    let selectedKeys = []
    switch (item.key) {
      case 'create_at+1':
        sort.create_at = 1
        selectedKeys.push('create_at+1')
        break
      case 'create_at-1':
        sort.create_at = -1
        selectedKeys.push('create_at-1')
        break
      case 'update_at+1':
        sort.update_at = 1
        selectedKeys.push('update_at+1')
        break
      case 'update_at-1':
        sort.update_at = -1
        selectedKeys.push('update_at-1')
        break
      default:
        break
    }
    this.setState({
      sorter: sort,
      selectedSorterKeys: selectedKeys
    }, () => {
      const { searchText, sorter } = this.state
      viewArticleItem('')
      fetchArticleList({
        sort: sorter,
        keyword: searchText,
        page: 1
      }, true)
    })
  }

  handlerSearch = val => {
    if (val === this.state.searchText && !!val) {
      return
    }
    this.setState({
      searchText: val
    })
    this.props.fetchArticleList({
      keyword: val,
      page: 1
    }, true)
    this.setState({
      selectedSorterKeys: ['create_at-1']
    })
  }

  handleViewArticleItem = id => {
    const { currentArticleId, viewArticleItem } = this.props
    viewArticleItem(id === currentArticleId ? '' : id)
  }

  handleArticleToolClick = (key, id) => {
    let state = 1
    switch (key) {
      case 'publish':
        state = 1
        break
      case 'draft':
        state = 0
        break
      case 'delete':
        state = -1
        break
      default:
        break
    }
    this.props.editArticleItem({}, [id], state)
  }

  handleLoadmore = e => {
    const { fetchArticleList, pagination } = this.props
    if (pagination.current_page >= pagination.total_page) {
      return
    }
    const { searchText, sorter } = this.state
    fetchArticleList({
      sort: sorter,
      keyword: searchText,
      page: pagination.current_page + 1
    })
  }

  render () {
    const { refreshing, fetching, articleList, pagination, currentArticleId } = this.props
    return (
      <Page customClassName={styles.page_all_article}>
        <div className={styles.list_view}>
          <ListFilter
            sorterMenus={sorterMenus}
            selectedSorterKeys={this.state.selectedSorterKeys}
            onMenuClick={this.handleSorterMenuClick}
            onSearch={this.handlerSearch}
          />
          <InfiniteScroll
            customClassName={[styles.list_content, refreshing ? styles.refreshing : '']}
            onLoadmore={this.handleLoadmore}
            loading={fetching}
          >
            {
              articleList.length
                ? <ArticleList
                    articleList={articleList}
                    pagination={pagination}
                    currentArticleId={currentArticleId}
                    onItemSelected={this.handleViewArticleItem}
                    onToolClick={this.handleArticleToolClick}
                  />
                : <NoData show={!fetching} text="NO ARTICLE DATA" iconSize={36} />
            }
            <ListReFreshLoading loading={refreshing} />
            <Loading className={styles.loadmore_loading} loading={fetching} />
          </InfiniteScroll>
          <div className={styles.list_info}>
            <span className={styles.total_count}>总共{pagination.total}篇文章</span>
          </div>
        </div>
        <div className={styles.detail_view}>
          <ArticleDetail />
        </div>
      </Page>
    )
  }
}

AllArticle.propTypes = {
  articleList: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  refreshing: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  deleting: PropTypes.bool.isRequired,
  currentArticleId: PropTypes.string,
  fetchArticleList: PropTypes.func.isRequired,
  editArticleItem: PropTypes.func.isRequired,
  deleteArticleItem: PropTypes.func.isRequired,
  viewArticleItem: PropTypes.func.isRequired,
  fetchCategoryList: PropTypes.func.isRequired,
  fetchTagList: PropTypes.func.isRequired
}

export default AllArticle

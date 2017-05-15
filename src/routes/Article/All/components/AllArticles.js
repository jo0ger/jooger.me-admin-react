import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import ArticleList from './ArticleList'
import styles from '../assets/allArticle'

export class AllArticles extends Component {
  
  static propTypes = {
    history: PropTypes.object.isRequired,
    listFetching: PropTypes.bool.isRequired,      // 文章请求状态
    articleList: PropTypes.array.isRequired,      // 文章列表
    pagination: PropTypes.object.isRequired,      // 分页信息,
    fetchArticleList: PropTypes.func.isRequired   // 文章获取方法
  }

  state = {
    selectedList: [],       // 批量选中的文章ID
    filterInfo: {}          // 列表过滤信息
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

  _editArticle (id, index, state = 0) {

  }

  handleSelect = (record, selected, selectedRows) => {
    this.setState({ selectedList: selectedRows })
  }

  handleSelectAll = (selected, selectedRows, changeRows) => {
    this.setState({
      selectedList: selected ? this.state.articleList : []
    })
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({ filterInfo: filters }, () => {
      const { state } = this.state.filterInfo
      const params = { page : pagination.current }
      if (state && state.length) {
        params.state = state[0]
      }
      this.props.fetchArticleList(params)
    })
  }

  handleOperate = (id, index, type) => {
    switch (type) {
      case 'edit':
        this.props.history.push(`/article/edit/${id}`)
        break;
      case 'publish':
        this._editArticle(id, index, 1)
        break
      case 'moveDraft':
        this._editArticle(id, index, 0)
        break
      case 'moveRecycle':
        this._editArticle(id, index, -1)
        break
      case 'delete':
        this._deleteArticle(id, index)
        break
      default:
        break;
    }
  }

  render () {
    const { articleList, pagination, listFetching } = this.props
    const listProps = {
      articleList,
      pagination,
      listFetching,
      onSelect: this.handleSelect,
      onSelectAll: this.handleSelectAll,
      onOperate: this.handleOperate,
      onChange: this.handleChange
    }

    return (
      <Card className={styles['page-articles']} title={'全部文章'}>
        <ArticleList {...listProps} />
      </Card>
    )
  }
}

export default AllArticles

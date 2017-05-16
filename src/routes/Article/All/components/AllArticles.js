import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Tag } from 'antd'
import ArticleList from '../containers/ArticleListContainer'
import styles from '../assets/allArticle'

export class AllArticles extends Component {
  
  static propTypes = {
    articleList: PropTypes.array.isRequired,      // 文章列表
    filter: PropTypes.object.isRequired,
    sorter: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,      // 文章分页信息
    fetchArticleList: PropTypes.func.isRequired,  // 文章获取方法
    editArticle: PropTypes.func.isRequired        // 文章修改状态方法
  }

  state = {
    selectedList: []              // 批量选中的文章ID
  }

  componentWillMount () {
    this._init()
  }

  componentWillUnmount () {
    const { sorter, filter, fetchArticleList } = this.props
    const { state } = filter
    const params = { page: 1 }
    if (state && state.length) {
      params.state = state[0]
    }
    if (sorter && sorter.field) {
      params.sort = { [sorter.field]: sorter.order === 'descend' ? -1 : 1 }
    }
    fetchArticleList(params, filter, sorter)
  }

  _init () {
    const { articleList, fetchArticleList } = this.props
    if (articleList && articleList.length) {
      return
    }
    fetchArticleList()
  }

  // 编辑文章状态（单篇 || 批量）
  _editArticleState (ids, indexes, state = 0) {
    this.props.editArticle({
      article_ids: ids,
      indexes,
      state
    })
  }

  _deleteArticle (ids, indexes) {
    
  }

  // 单选
  handleTableSelect = (record, selected, selectedRows) => {
    this.setState({ selectedList: selectedRows.map(item => item._id) })
  }

  // 全选
  handleTableSelectAll = (selected, selectedRows, changeRows) => {
    this.setState({
      selectedList: selected ? this.props.articleList.map(item => item._id) : []
    })
  }

  render () {
    const listProps = {
      onSelect: this.handleTableSelect,
      onSelectAll: this.handleTableSelectAll
    }

    return (
      <Card
        className={styles['page-articles']}
        title={<h4>共<Tag color="blue" className={styles['article-count']}>{ this.props.pagination.total || 0 }</Tag>篇文章</h4>}
      >
        <ArticleList {...listProps} />
      </Card>
    )
  }
}

export default AllArticles

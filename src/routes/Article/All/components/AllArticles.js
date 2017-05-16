import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import ArticleList from './ArticleList'
import styles from '../assets/allArticle'

export class AllArticles extends Component {
  
  static propTypes = {
    history: PropTypes.object.isRequired,
    listFetching: PropTypes.bool.isRequired,      // 文章请求状态
    listEditing: PropTypes.bool.isRequired,       // 文章编辑状态
    articleList: PropTypes.array.isRequired,      // 文章列表
    pagination: PropTypes.object.isRequired,      // 分页信息,
    filter: PropTypes.object.isRequired,          // 分页过滤,
    fetchArticleList: PropTypes.func.isRequired,  // 文章获取方法
    editArticle: PropTypes.func.isRequired        // 文章修改状态方法
  }

  state = {
    selectedList: []       // 批量选中的文章ID
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

  // filter和sorter变化
  handleTableChange = (pagination, filters, sorter) => {
    const { state } = filters
    const params = { page : pagination.current }
    if (state && state.length) {
      params.state = state[0]
    }
    if (sorter && sorter.field) {
      params.sort = { [sorter.field]: sorter.order === 'descend' ? -1 : 1 }
    }
    this.props.fetchArticleList(params, filters, sorter)
  }

  // 文章操作
  handleTableOperate = (id, index, type) => {
    switch (type) {
      case 'edit':
        this.props.history.push(`/article/edit/${id}`)
        break;
      case 'publish':
        this._editArticleState([id], [index], 1)
        break
      case 'moveDraft':
        this._editArticleState([id], [index], 0)
        break
      case 'moveRecycle':
        this._editArticleState([id], [index], -1)
        break
      case 'delete':
        this._deleteArticle([id], index)
        break
      default:
        break;
    }
  }

  render () {
    const { articleList, pagination, filter, sorter, listFetching, listEditing } = this.props
    const listProps = {
      articleList,
      pagination,
      filter,
      sorter,
      listFetching,
      listEditing,
      onSelect: this.handleTableSelect,
      onSelectAll: this.handleTableSelectAll,
      onOperate: this.handleTableOperate,
      onChange: this.handleTableChange
    }

    return (
      <Card
        className={styles['page-articles']}
        title={<h2>全部文章</h2>}
      >
        <ArticleList {...listProps} />
      </Card>
    )
  }
}

export default AllArticles

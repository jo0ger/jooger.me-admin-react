import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import Service from '~service'
import ArticleList from '~components/ArticleList'


class ArticleAll extends Component {

  static defaultProps = {
    history: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = this.initialState()
  }

  initialState () {
    return {
      articleList: [],
      pagination: {},
      selectedList: [],
      listLoading: false,
      filterInfo: {}
    }
  }
  
  componentWillMount () {
    this._fetchArticleList(this.state.pagination.current_page)
  }

  async _fetchArticleList (page = 1) {
    let state = this.state.filterInfo.state
    let params = { page }
    if (state && state.length) {
      params.state = state[0]
    }
    this._startFetchList()
    let { code, data } = await Service.article.getList({ params })
    this._completeFetchList()
    if (!code) {
      this.setState({
        articleList: data.list,
        pagination: data.pagination
      })
    }
  }

  async _editArticle (id, index, state = 0) {
    this._startFetchList()
    let { code, data } = await Service.article.changeItemState(id)({ state })
    this._completeFetchList()
    if (!code) {
      let articleList = [...this.state.articleList]
      articleList.splice(index, 1, data)
      this.setState({ articleList })
    }
  }

  async _deleteArticle (id, index) {
    this._startFetchList()
    let { code, data } = await Service.article.deleteItem(id)()
    if (!code) {
      await this._fetchArticleList()
    }
    this._completeFetchList()
  }

  _startFetchList () {
    this.setState({ listLoading: true })
  }

  _completeFetchList () {
    this.setState({ listLoading: false })
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
      this._fetchArticleList(pagination.current)
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
    const { articleList, pagination, listLoading } = this.state
    const articleListProps = {
      articleList,
      pagination,
      loading: listLoading,
      onSelect: this.handleSelect,
      onSelectAll: this.handleSelectAll,
      onOperate: this.handleOperate,
      onChange: this.handleChange
    }
    return (
      <div className="content-inner">
        <ArticleList { ...articleListProps } />
      </div>
    )
  }
}

export default withRouter(ArticleAll)

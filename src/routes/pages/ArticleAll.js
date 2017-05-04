import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Service from '~service'
import ArticleList from '~components/article/ArticleList'


class ArticleAll extends Component {

  static defaultProps = {}

  constructor (props) {
    super(props)
    this.state = this.initialState()
  }

  initialState () {
    return {
      articleList: [],
      pagination: {},
      selectedList: []
    }
  }
  
  componentWillMount () {
    this.fetchArticleList(this.state.pagination.current_page)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.pagination.currentPage !== this.state.pagination.current) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  

  async fetchArticleList (page = 1) {
    let { code, data } = await Service.article.getList({ page })
    if (!code) {
      this.setState({
        articleList: data.list,
        pagination: data.pagination
      })
    }
  }

  handlePageChange = (page, pageSize) => {
    this.fetchArticleList(page)
  }

  handleSelect = (record, selected, selectedRows) => {
    this.setState({ selectedList: selectedRows })
  }

  handleSelectAll = (selected, selectedRows, changeRows) => {
    this.setState({
      selectedList: selected ? this.state.articleList : []
    })
  }

  render () {
    const { articleList, pagination } = this.state
    const articleListProps = {
      articleList,
      pagination,
      onPageChange: this.handlePageChange,
      select: this.handleSelect,
      selectAll: this.handleSelectAll
    }
    return (
      <div className="content-inner">
        <ArticleList { ...articleListProps } />
      </div>
    )
  }
}

export default ArticleAll

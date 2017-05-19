import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Tag, Button, Badge } from 'antd'
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
  
  render () {
    const articleStates = {
      published: 0,
      drafted: 0,
      deleted: 0
    }

    this.props.articleList.map(item => {
      switch (item.state) {
        case -1:
          articleStates.deleted++
          break
        case 0:
          articleStates.drafted++
          break
        case 1:
          articleStates.published++
          break
        default:
          break
      }
      return null
    })

    return (
      <Card
        className={styles['page-articles']}
        title={
          <h4 className={styles['page-title']}>共
            <Tag color="blue" className={styles['article-count']}>{ this.props.pagination.total || 0 }</Tag>
            篇文章&nbsp;&nbsp;&nbsp;&nbsp;
            <Badge status="success" text={articleStates.published} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Badge status="warning" text={articleStates.drafted} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Badge status="error" text={articleStates.deleted} />&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/article/publish">
              <Button type="primary" icon="plus" className={styles['new-article-btn']}>新建文章</Button>
            </Link>
          </h4>}
      >
        <ArticleList />
      </Card>
    )
  }
}

export default AllArticles

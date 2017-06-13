import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, message } from 'antd'
import Transition from '~components/Transition'
import NoData from '~components/NoData'
import { Loading, ReFreshLoading } from '~components/Loading'
import { CommentInputBox } from '~components/Comment'
import CommentList from '~components/Comment'
import styles from '../assets/ArticleComments'
import Service from '~service'
import { admin } from '~config'

export class ArticleComments extends Component {

  state = {
    fetching: false,
    refreshing: false,
    commentList: [],
    pagination: {
      total: 0,
      current_page: 0,
      total_page: 0,
      per_page: 10
    }
  }

  componentWillMount () {
    this.fetchCommentList(true)
  }

  async fetchCommentList (refresh = false) {
    const { commentList, pagination, fetching, refreshing } = this.state
    if (fetching || refreshing) {
      return message.info('正在获取评论...')
    }
    this.setState({ [refresh ? 'refreshing' : 'fetching']: true })
    const { code, data } = await Service.comment.getList({
      params: {
        page_id: this.props.articleId,
        page: pagination.current_page + 1
      }
    })
    this.setState({ [refresh ? 'refreshing' : 'fetching']: false })
    if (!code) {
      this.setState({
        commentList: refresh ? data.list : [...commentList, ...data.list],
        pagination: data.pagination,
      })
    }
  }

  handleLikeItem = index => {
    const list = [...this.state.commentList]
    list[index].likes++
    this.setState({ commentList: list })
  }

  handleReply = (value, cb) => {
    Service.comment.create({
      data: {
        page_id: this.props.articleId,
        type: 0,
        author: admin,
        content: value
      }
    }).then(({ code, data }) => {
      if (!code) {
        this.handleAddComment(data)
        cb && cb()
      }
      return !code
    }).catch(err => message.error(err.message || err))
  }

  handleAddComment = comment => {
    if (!comment || !comment._id) {
      return
    }
    this.setState({
      commentList: [comment, ...this.state.commentList]
    })
  }

  titleRender () {
    const len = this.state.commentList.length
    return `评论（${this.state.fetching ? '评论获取中...' : (len > 0 ? `${len}条` : '暂无')}）`
  }
  
  render () {
    const { commentList, fetching, refreshing, pagination } = this.state
    const { articleId } = this.props

    return (
      <Transition name="slide-right-100">
        <Card
          key="comments"
          className={styles.article_comments}
          title={this.titleRender()}
          extra={<Icon className={styles.close_btn} type="close" onClick={this.props.onClose} />}
        >
        <div>
          <CommentInputBox
            toArticle
            onSubmit={this.handleReply}
          />
          {
            commentList.length
              ? <CommentList
                  style={{top: 266}}
                  pageId={articleId}
                  data={commentList}
                  pagination={pagination}
                  isTalkList={false}
                  onLike={this.handleLikeItem}
                  onAddComment={this.handleAddComment}
                />
              : <NoData show={!fetching && !refreshing} text="暂无评论" />
          }
          <ReFreshLoading loading={refreshing} />
          <Loading loading={fetching} />
        </div>
        </Card>
      </Transition>
    )
  }
}

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ArticleComments

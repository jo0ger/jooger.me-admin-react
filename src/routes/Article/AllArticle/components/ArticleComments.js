import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, message, Radio } from 'antd'
import BaseComponent from '~components/BaseComponent'
import Transition from '~components/Transition'
import NoData from '~components/NoData'
import InfiniteScroll from '~components/InfiniteScroll'
import { CommentInputBox } from '~components/Comment'
import CommentList from '~components/Comment'
import styles from '../assets/ArticleComments'
import Service from '~service'
import { admin } from '~config'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export class ArticleComments extends BaseComponent {

  state = {
    fetching: false,
    refreshing: false,
    commentList: [],
    pagination: {
      total: 0,
      current_page: 0,
      total_page: 0,
      per_page: 10
    },
    sort: 0     // 0 时间倒序 1 时间正序 2 点赞数倒序
  }

  componentWillMount () {
    this.fetchCommentList(true)
  }

  async fetchCommentList (refresh = false) {
    const { commentList, pagination, fetching, refreshing, sort } = this.state
    if (fetching || refreshing) {
      return message.info('正在获取评论...')
    }
    this.setState({ [refresh ? 'refreshing' : 'fetching']: true })
    let { code, data } = await Service.comment.getList({
      params: {
        page_id: this.props.articleId,
        page: refresh ? 1 : pagination.current_page + 1,
        sort
      }
    })
    this.setState({ [refresh ? 'refreshing' : 'fetching']: false })
    if (!code) {
      data = data.toJS()
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
        this.handleAddComment(data.toJS())
        cb && cb()
      }
      return !code
    }).catch(err => {
      message.error(err.message || err)
      console.error(err.message || err)
    })
  }

  handleAddComment = comment => {
    if (!comment._id) {
      return
    }
    const { articleDetail, onReplySuccess } = this.props
    this.setState({
      commentList: [comment, ...this.state.commentList]
    })
    const _article = {...articleDetail}
    _article.meta.comments++
    console.log(_article)
    onReplySuccess({
      id: comment._id,
      data: _article
    })
  }

  handleLoadmore = () => {
    const { pagination } = this.state
    if (pagination.current_page >= pagination.total_page) {
      return
    }
    this.fetchCommentList(false)
  }

  handleSort = e => {this.setState({ sort: e.target.value }, () => this.fetchCommentList(true))}

  titleRender () {
    const len = this.state.commentList.length
    return `评论（${len > 0 ? `${len}条` : '暂无'}）`
  }

  titleExtraRender () {
    const { sort } = this.state
    return (
      <div>
        <RadioGroup onChange={this.handleSort} value={sort} size="small">
          <RadioButton value={0}>最新</RadioButton>
          <RadioButton value={1}>最久</RadioButton>
          <RadioButton value={2}>最热</RadioButton>
        </RadioGroup>
        <Icon className={styles.close_btn} type="close" onClick={this.props.onClose} />
      </div>
    )
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
          extra={this.titleExtraRender()}
        >
        <InfiniteScroll
          customClass={styles.list_wrapper}
          onLoadmore={this.handleLoadmore}
          loading={fetching}
          refreshing={refreshing}
          noMoreData={pagination.current_page >= pagination.total_page}
        >
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
        </InfiniteScroll>
        </Card>
      </Transition>
    )
  }
}

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  articleDetail: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onReplySuccess: PropTypes.func.isRequired
}

export default ArticleComments

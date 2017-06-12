import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { message, Modal } from 'antd'
import styles from './CommentList.styl'
import CommentItem from './CommentItem'
import Service from '~service'
import { storage } from '~utils'

const { JOOGER_USER_LIKE_HISTORY, getStorageItem, setStorageItem } = storage

export class CommentList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      replyingId: '',
      talkReplyingId: '',
      likeFetching: false,
      historyLikes: {
        articles: [],
        comments: []
      },
      currentTalkCommentId: '',
      showTalkModal: false,
      currentTalkList: [],
      talkFetching: false
    }
  }

  componentWillMount () {
    this.init()
  }

  init () {
    let history = getStorageItem(JOOGER_USER_LIKE_HISTORY)
    history = (history && JSON.parse(history)) || {}
    this.setState({
      historyLikes: {
        ...this.state.historyLikes,
        ...history
      }
    })
  }

  checkLiked (commentId) {
    return this.state.historyLikes.comments.indexOf(commentId) > -1
  }

  handleLike = (id, index) => e => {
    if (this.state.likeFetching) {
      return
    }
    const { historyLikes } = this.state
    this.setState({ likeFetching: true })
    return Service.comment.like({ data: { id, type: 1 } }).then(({ code }) => {
      this.setState({ likeFetching: false })
      if (!code) {
        const newHistoryLikes = {
          articles: historyLikes.articles,
          comments: [
            ...historyLikes.comments,
            id
          ]
        }
        setStorageItem(JOOGER_USER_LIKE_HISTORY, JSON.stringify(newHistoryLikes))
        this.setState({ historyLikes: newHistoryLikes })
        this.props.onLike(index)
      }
    }).catch(err => {
      console.error(err)
      message.error(err.message || '点赞出现错误，请查看控制台')
    })
  }

  handleViewTalk = commentId => () => {
    this.setState({
      showTalkModal: true,
      currentTalkCommentId: commentId,
      talkFetching: true
    })
    Service.comment.getItem(commentId)().then(({ code, data }) => {
      this.setState({ talkFetching: false })
      if (!code && data) {
        let forward = data.forward
        const talkList = [data]
        while (forward) {
          talkList.push(forward)
          forward = forward.forward
        }
        this.setState({ currentTalkList: talkList })
      }
    }).catch(err => {
      console.error(err)
      message.error(err.message || '查看对话错出现错误，请查看控制台')
    })
  }

  handleCloseTalk = () => {
    this.setState({
      showTalkModal: false
    }, () => (this.setState({ currentTalkList: [] })))
  }

  render () {
    const { data, isTalkList } = this.props
    const { replyingId, talkReplyingId, likeFetching, showTalkModal, currentTalkCommentId, currentTalkList } = this.state

    return (
      <div className={styles.comment_list}>
        <div>
          {
            data.map((item, index) => (
              <CommentItem
                key={item._id}
                data={item}
                isReplying={talkReplyingId === item._id}
                isLiked={this.checkLiked(item._id)}
                likeFetching={likeFetching}
                isTalk={isTalkList}
                onLike={this.handleLike(item._id, index)}
                onViewTalk={this.handleViewTalk(item._id)}
                talkOpened={currentTalkCommentId === item._id}
              />
            ))
          }
        </div>
        <Modal
          className={styles.talk_modal}
          title="对话"
          width={688}
          style={{ top: 50 }}
          visible={showTalkModal}
          onCancel={this.handleCloseTalk}
          footer={null}
        >
          {
            currentTalkList.map((item, index) => {
              return (
                <CommentItem
                  key={item._id}
                  data={item}
                  isReplying={replyingId === item._id}
                  isLiked={this.checkLiked(item._id)}
                  likeFetching={likeFetching}
                  isTalk={!!item._id}
                  onLike={this.handleLike(item._id, index)}
                  onViewTalk={this.handleViewTalk(item._id)}
                  talkOpened={currentTalkCommentId === item._id}
                />
              )
            })
          }
        </Modal>
      </div>
    )
  }

}

CommentList.propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  isTalkList: PropTypes.bool.isRequired
}

export default CommentList

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { message, Modal } from 'antd'
import styles from './CommentList.styl'
import CommentItem from './CommentItem'
import { RefreshLoading } from '../Loading'
import Service from '~service'
import { storage } from '~utils'
import { admin } from '~config'

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
      talkCommentId: '',
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

  handleLike = (id, index) => isTalk => {
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

        let commentIndex = index
        if (isTalk) {
          // talk的话需要更新Modal内的talkList
          commentIndex = this.props.data.findIndex(item => item._id === id)
          const talkList = [...this.state.currentTalkList]
          talkList[index].likes++
          this.setState({ currentTalkList: talkList })
        }
        this.props.onLike(commentIndex)
      }
    }).catch(err => {
      console.error(err)
      message.error(err.message || '点赞出现错误，请查看控制台')
    })
  }

  handleViewTalk = commentId => () => {
    if (this.state.talkFetching) {
      return
    }
    this.setState({
      showTalkModal: true,
      talkCommentId: commentId,
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
      message.error(err.message || '查看对话出现错误，请查看控制台')
    })
  }

  handleCloseTalk = () => {
    this.setState({
      showTalkModal: false
    }, () => (this.setState({ currentTalkList: [], talkCommentId: '' })))
  }

  handleToggleDisplayReply = (id, shouldOpen, isTalk) => {
    this.setState({
      [isTalk ? 'talkReplyingId' : 'replyingId']: shouldOpen ? id : ''
    })
  }

  handleReply = ({value, replyId, isTalk, index, cb}) => {
    const { currentTalkList } = this.state
    const { pageId, onAddComment } = this.props
    const data = {
      page_id: pageId,
      content: value,
      author: admin,
      type: 0
    }
    if (isTalk) {
      const talkParent = currentTalkList[0]
      const forwardTalk = talkParent[index - 1]
      data.parent = talkParent._id
      data.forward = (forwardTalk && forwardTalk._id) || talkParent._id
    } else {
      data.forward = data.parent = replyId
    }
    return Service.comment.create({ data }).then(({ code, data }) => {
      if (!code) {
        onAddComment(data)
        cb && cb()
        this.setState({
          replyingId: '',
          talkReplyingId: ''
        })
      }
      return !code
    }).catch(err => {
      console.error(err.message)
      message.error(err.message || '回复评论出现错误，请查看控制台')
    })
  }

  render () {
    const { data, isTalkList } = this.props
    const { replyingId, talkReplyingId, likeFetching, showTalkModal, talkCommentId, currentTalkList, talkFetching } = this.state

    return (
      <div className={styles.comment_list}>
        <div>
          {
            data.map((item, index) => (
              <CommentItem
                key={item._id}
                index={index}
                data={item}
                isReplying={talkReplyingId === item._id}
                isLiked={this.checkLiked(item._id)}
                likeFetching={likeFetching}
                isTalk={isTalkList}
                onLike={this.handleLike(item._id, index)}
                onViewTalk={this.handleViewTalk(item._id)}
                talkOpened={talkCommentId === item._id}
                replyOpened={replyingId === item._id}
                onToggleDisplayReply={this.handleToggleDisplayReply}
                onReply={this.handleReply}
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
                  index={index}
                  data={item}
                  isLiked={this.checkLiked(item._id)}
                  likeFetching={likeFetching}
                  isTalk
                  replyOpened={talkReplyingId === item._id}
                  onLike={this.handleLike(item._id, index)}
                  onViewTalk={this.handleViewTalk(item._id)}
                  onToggleDisplayReply={this.handleToggleDisplayReply}
                  onReply={this.handleReply}
                />
              )
            })
          }
          <RefreshLoading loading={talkFetching} />
        </Modal>
      </div>
    )
  }

}

CommentList.propTypes = {
  pageId: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  isTalkList: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired
}

export default CommentList

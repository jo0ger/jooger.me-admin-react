import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import styles from './CommentItem.styl'
import { constant } from '~config'
import { classnames, commentMetaParser, fmtDate } from '~utils'

const { UAParse, OSParse } = commentMetaParser

export class CommentItem extends Component {
  
  handleLike = () => {
    if (this.props.isLiked) {
      return
    }
    this.props.onLike()
  }

  titleRender () {
    const { data } = this.props
    return (
      <h5 className={styles.title}>
        {
          data.author
            ? <a className={styles.author_name}>{data.author.name}</a>
            : null
        }
        {
          data.forward
            ? (
                <span className={styles.reply}>
                  <span className={styles.reply_text}>回复</span>
                  <a className={styles.reply_author}>
                    <span>{'@ ' + data.forward.author.name}</span>
                  </a>
                </span>
              )
            : null
        }
        <span className={styles.blogger} title="这是我自己发布的评论">
          <Icon type="user" />
        </span>
      </h5>
    )
  }

  metaRender () {
    const { agent, ip_location } = this.props.data.meta
    return (
      <p className={styles.meta}>
        {
          agent
            ? <span className={styles.os} dangerouslySetInnerHTML={{__html: OSParse(agent)}} />
            : null
        }
        {
          agent
            ? <span className={styles.ua} dangerouslySetInnerHTML={{__html: UAParse(agent)}} />
            : null
        }
        {
          ip_location
            ? (
                <span className={styles.location}>
                  <span>{ip_location.country}</span>
                  {
                    ip_location.country && ip_location.city
                      ? <span>&nbsp;-&nbsp;</span>
                      : null
                  }
                  <span>{ip_location.city}</span>
                </span>
              )
            : null
        }
      </p>
    )
  }

  contentRender () {
    const { data } = this.props
    return (
      <div className={styles.content}>
        <div
          className="markdown_body"
          dangerouslySetInnerHTML={{__html: data.rendered_content}}
        />
      </div>
    )
  }

  infoRender () {
    const { data, likeFetching, isLiked, isReplying, isTalk, talkOpened, onViewTalk } = this.props
    return (
      <div className={styles.info}>
        <span className={styles.date}>{fmtDate(data.create_at)}</span>
        <a
          className={classnames({
            [styles.like]: true,
            [styles.is_liking]: likeFetching,
            [styles.is_liked]: isLiked,
          })}
          onClick={this.handleLike}
        >
          <Icon type="like" />
          <span>{data.likes} 人赞</span>
        </a>
        <div className={styles.actions}>
          {
            !isTalk && data.forward
              ? (
                  <a
                    className={classnames([styles.action_item, styles.talk, talkOpened ? styles.talk_open : styles.talk_close])}
                    onClick={onViewTalk}
                  >
                    <Icon type="message" />
                    <span>{ talkOpened ? '隐藏对话' : '查看对话' }}</span>
                  </a>
                )
              : null
          }
          <a
            className={classnames({
              [styles.action_item]: true,
              [styles.reply]: true,
              [styles.show]: isReplying
            })}
          >
            <i className={classnames(['iconfont', 'icon-reply'])} />
            <span>{ isReplying ? '取消回复' : '回复' }</span>
          </a>
        </div>
      </div>
    )
  }

  render () {
    const { data } = this.props
    return (
      <div className={styles.comment_item}>
        <div className={styles.wrapper}>
          <img className={styles.avatar} src={(data.author && data.author.avatar) || constant.defaultAvatar} alt="USER AVATAR" />
          <div className={styles.bd}>
            {this.titleRender()}
            {this.metaRender()}
            {this.contentRender()}
            {this.infoRender()}
          </div>
        </div>
      </div>
    )
  }

}

CommentItem.propTypes = {
  data: PropTypes.object.isRequired,
  likeFetching: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isTalk: PropTypes.bool.isRequired,
  isReplying: PropTypes.bool.isRequired,
  talkOpened: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onViewTalk: PropTypes.func.isRequired
}

export default CommentItem

import React from 'react'
import PropTypes from 'prop-types'
import styles from './CommentItem.styl'
import { constant } from '~config'

export const CommentItem = ( data = {} ) => {
  return (
    <div className={styles.comment_item}>
      <div className={styles.wrapper}>
        <img className={styles.avatar} src={data.author ? data.author.avatar : constant.defaultAvatar} />
        <div className={styles.bd}>
          <div className={styles.title}>
            <div className={styles.name}></div>
            <div className={styles.time}></div>
          </div>
          <div className={styles.content}></div>
          <div className={styles.meta}></div>
        </div>
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default CommentItem

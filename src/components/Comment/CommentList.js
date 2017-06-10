import React from 'react'
import PropTypes from 'prop-types'
import styles from './CommentList.styl'
import CommentItem from './CommentItem'

export const CommentList = ({ data = [] }) => {
  return (
    <div className={styles.comment_list}>
      {
        data.map(item => (
          <CommentItem
            key={item._id}
            data={item}
          />
        ))
      }
    </div>
  )
}

CommentList.propTypes = {
  data: PropTypes.array.isRequired
}

export default CommentList

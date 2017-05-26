import React from 'react'
import PropTypes from 'prop-types'
import styles from './ListItem.styl'

export const ListItem = ({ children }) => {
  return (
    <div className={styles.list_item}>
      {children}
    </div>
  )
}

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default ListItem

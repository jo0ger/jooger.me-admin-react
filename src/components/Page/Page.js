import React from 'react'
import PropTypes from 'prop-types'
import styles from './Page.styl'

export const Page = ({ children }) => {
  const [leftContainer, rightContainer] = children
  return (
    <div className={styles.page}>
      <div className={styles.page_left}>
        {leftContainer}
      </div>
      <div className={styles.page_right}>
        {rightContainer}
      </div>
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default Page

import React from 'react'
import PropTypes from 'prop-types'
import styles from './Page.styl'
import { classnames, buildClassName } from '~utils'

export const Page = ({ children, customClassName = '' }) => {
  const [leftContainer, rightContainer] = children
  return (
    <div
      className={classnames({
        [styles.page]: true,
        ...buildClassName(customClassName)
      })}
    >
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
  ]),
  customClassName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ])
}

export default Page

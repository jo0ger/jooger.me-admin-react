import React from 'react'
import PropTypes from 'prop-types'
import styles from './ViewPort.styl'

export const ViewPort = ({ children }) => {
  return (
    <div className={styles.g_viewport}>
      {children}
    </div>
  )
}

ViewPort.propTypes = {
  children: PropTypes.object
}

export default ViewPort

import React from 'react'
import PropTypes from 'prop-types'
import styles from './Loading.styl'

export const Loading = ({ loading = false }) => {
  return loading ? <div className={styles.loading} /> : null
}

Loading.propTypes = {
  loading: PropTypes.bool
}

export default Loading

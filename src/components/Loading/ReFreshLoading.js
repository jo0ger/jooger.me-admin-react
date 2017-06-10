import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import styles from './ReFreshLoading.styl'

export const ReFreshLoading = ({ loading = false }) => {
  return loading ? (
    <div className={styles.refresh_loading}>
      <div className={styles.refresh_overlay} />
      <Loading loading={loading} />
    </div>
  ) : null
}

ReFreshLoading.propTypes = {
  loading: PropTypes.bool
}

export default ReFreshLoading

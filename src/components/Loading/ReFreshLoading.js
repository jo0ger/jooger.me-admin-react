import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import styles from './RefreshLoading.styl'

export const RefreshLoading = ({ loading = false }) => {
  return loading ? (
    <div className={styles.refresh_loading}>
      <div className={styles.refresh_overlay} />
      <Loading loading={loading} />
    </div>
  ) : null
}

RefreshLoading.propTypes = {
  loading: PropTypes.bool
}

export default RefreshLoading

import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import styles from './ListReFreshLoading.styl'

export const ListReFreshLoading = ({ loading = false }) => {
  return loading ? (
    <div className={styles.list_refresh_loading}>
      <div className={styles.refresh_overlay} />
      <Loading loading={loading} />
    </div>
  ) : null
}

ListReFreshLoading.propTypes = {
  loading: PropTypes.bool
}

export default ListReFreshLoading

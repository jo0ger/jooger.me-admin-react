import React from 'react'
import PropTypes from 'prop-types'
import Header from '~layouts/Header'
import Sider from '~layouts/Sider'
import ViewPort from '~layouts/ViewPort'
import styles from './AppLayout.styl'

export const AppLayout = ({ children }) => {
  return (
    <div className={styles.app_layout}>
      <Header />
      <div className={styles.main_container}>
        <Sider />
        <ViewPort>
          {children}
        </ViewPort>
      </div>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default AppLayout

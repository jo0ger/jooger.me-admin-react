import React from 'react'
import PropTypes from 'prop-types'
import Header from '~layouts/Header'
import Sider from '~layouts/Sider'
import ViewPort from '~layouts/ViewPort'
import styles from './AppLayout.styl'

const singlePage = ['/login']

export const AppLayout = ({ children, location}) => {

  return (
    <div className={styles.app_layout}>
      {
        singlePage.includes(location.pathname)
          ? children
          : (
              <div>
                <Header />
                <div className={styles.main_container}>
                  <Sider location={location} />
                  <ViewPort>
                    {children}
                  </ViewPort>
                </div>
              </div>
            )
      }
      
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
}

export default AppLayout

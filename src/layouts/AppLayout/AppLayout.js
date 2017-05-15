import React from 'react'
import PropTypes from 'prop-types'
import Header from '~layouts/Header'
import Bread from '~layouts/Bread'
import Main from '~layouts/Main'
import Footer from '~layouts/Footer'
import styles from './AppLayout.styl'

export const AppLayout = ({ children, location }) => {

  const headerProps = {
    location
  }

  const breadProps = {
    location
  }

  const mainProps = {
    location
  }
  
  return (
    <div className={styles['app-layout']}>
      <Header {...headerProps} />
      <Bread {...breadProps} />
      <Main {...mainProps}>
        {children}
      </Main>
      <Footer />
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
}

export default AppLayout

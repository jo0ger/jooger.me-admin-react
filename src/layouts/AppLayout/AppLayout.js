import React from 'react'
import PropTypes from 'prop-types'
import Header from '~layouts/Header'
import './AppLayout.styl'

export const AppLayout = ({ children }) => {
  return (
    <div className="container text-center">
      <Header />
      <div className="core-layout__viewport">
        {children}
      </div>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default AppLayout

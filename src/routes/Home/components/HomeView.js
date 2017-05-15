import React from 'react'
import '../assets/homeView'
import logo from '~static/logo.svg'

const HomeView = () => {
  return (
    <div>
      <h4>This is My React Boilerplate, because Redux!</h4>
      <img className="logo" src={logo} alt="LOGO" />
    </div>
  )
}

export default HomeView

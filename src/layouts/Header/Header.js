import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header'

export const Header = () => {
  return (
    <div>
      <h1>MY-REACT-BOILERPLATE</h1>
      <h2><a href="https://bodyno.com" target="_blank">bodyno</a></h2>
      <NavLink to="/" activeClassName="route--active">
        Home
      </NavLink>
      {" · "}
      <NavLink to="/counter" activeClassName="route--active">
        Counter
      </NavLink>
      {" · "}
      <NavLink to="/zen" activeClassName="route--active">
        Zen
      </NavLink>
      {" · "}
      <NavLink to="/notFound" activeClassName="route--active">
        404
      </NavLink>
    </div>
  )
}

export default Header

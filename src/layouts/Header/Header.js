import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.styl'
import { menu } from '~config'

export const Header = () => {
  return (
    <div className={styles.g_header}>
      <div className={styles.wrap}>
        <div className={styles.logo}>
          <div className={styles.logo_wrap} />
        </div>
        <nav className={styles.nav}>
          {
            menu.map(item => (
              <NavLink
                key={item.key}
                className={styles.nav_item}
                to={`/${item.key}`}
                activeClassName="route_active"
              >
                {item.name}
              </NavLink>
            ))
          }
        </nav>
        <div className={styles.actions}></div>
      </div>
    </div>
  )
}

export default Header

import React from 'react'
import { NavLink } from 'react-router-dom'
import DropOption from '~components/DropOption'
import styles from './Header.styl'
import { menu } from '~config'
import { classnames } from '~utils'
import defaultAvatar from '../../static/img/avatar/avatar.jpg'

const menuOptions = [
  { key: 'userinfo', icon: 'user', name: '个人信息'},
  { key: 'logout', icon: 'logout', name: '注销登录'}
]

export const Header = () => {

  const onMenuClick = item => {
    switch (item.key) {
      case 'logout':
        console.log('logout')
        break;
      default:
        break;
    }
  }

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
        <div className={styles.aside}>
          <div className={classnames([styles.aside_item, styles.user_action])}>
            <DropOption
              menuElement={<img src={defaultAvatar} alt="AVATAR" className={styles.user_avatar} />}
              menuOptions={menuOptions}
              menuStyle={{ padding: '10px 15px' }}
              buttonClass={classnames(styles.user_icon)}
              buttonStyle={{ display: 'inline-block', width: 80 }}
              onMenuClick={onMenuClick}
              placement="bottomRight"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import styles from './Sider.styl'
import { menu } from '~config'

const getChildRoutes = key => {
  const matched = menu.find(item => key.includes(item.key))
  return matched ? matched.children : null
}

const createBtn = {
  '/article/all': { text: '新建文章' },
  '/article/category': { text: '新建分类' },
  '/article/tag': { text: '新建标签' }
}

const getCreateBtn = pathname => {
  return (
    createBtn[pathname]
      ? <span>{createBtn[pathname].text}</span>
      : null
  )
}

export const Sider = ({ location }) => {
  const currentMenu = menu.find(item => location.pathname.includes(item.key))
  const childRoutes = getChildRoutes(currentMenu.key)
  
  return (
    childRoutes ? (
      <div className={styles.g_sider}>
        <div className={styles.hd}>
          <div className={styles.create_btn}>
            <Icon type="plus" />
            {getCreateBtn(location.pathname)}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.menus}>
            {
              childRoutes.map(item => (
                <NavLink
                  key={item.key}
                  to={`/${currentMenu.key}/${item.key}`}
                  className={styles.menu_item}
                  activeClassName="route_active"
                >
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </NavLink>
              ))
            }
          </div>
        </div>
      </div>
    ) : null
  )
}

Sider.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Sider)

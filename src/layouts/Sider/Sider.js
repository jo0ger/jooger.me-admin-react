import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import Transition from '~components/Transition'
import styles from './Sider.styl'
import { menu } from '~config'

const getChildRoutes = key => {
  const matched = menu.find(item => key.includes(item.key))
  return matched ? matched.children : null
}

const getParentPathname = pathname => pathname.split('/')[1]

const createBtn = {
  '/article/all': { text: '新建文章' },
  '/article/category': { text: '新建分类' },
  '/article/tag': { text: '新建标签' }
}

const getSiderHd = pathname => {
  return (
    createBtn[pathname]
      ? (
        <div className={styles.hd}>
          <div className={styles.create_btn}>
            <Icon type="plus" />
            <span>{createBtn[pathname].text}</span>
          </div>
        </div>
      )
      : null
  )
}

export const Sider = ({ location }) => {
  const pathname = location.pathname
  const currentMenu = menu.find(item => pathname.includes(item.key))
  const childRoutes = getChildRoutes(currentMenu ? currentMenu.key : '')

  return (
    childRoutes ? (
      <Transition name="slide-left-100">
        <div className={styles.g_sider} key={getParentPathname(pathname)}>
          {getSiderHd(pathname)}
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
      </Transition>
    ) : null
  )
}

Sider.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Sider)

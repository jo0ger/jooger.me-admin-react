import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
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

const createBtns = [
  { path: '/article/all', text: '新建文章' },
  { path: '/article/category', text: '新建分类' },
  { path: '/article/tag', text: '新建标签' }
]

export class Sider extends Component {

  siderHdRender (pathname) {
    const createBtn = createBtns.find(item => item.path.includes(pathname))
    return (
      createBtn
        ? (
          <div className={styles.hd}>
            <div className={styles.create_btn} onClick={this.handleClick(pathname)}>
              <Icon type="plus" />
              <span>{createBtn.text}</span>
            </div>
          </div>
        )
        : null
    )
  }

  handleClick = pathname => e => {
    const { createArticleItem } = this.props
    switch (pathname) {
      case '/article/all':
        createArticleItem()
        break
      default:
        break
    }
  }

  render () {
    const pathname = this.props.location.pathname
    const currentMenu = menu.find(item => pathname.includes(item.key))
    const childRoutes = getChildRoutes(currentMenu ? currentMenu.key : '')

    return (
      childRoutes ? (
        <Transition name="slide-left-100">
          <div className={styles.g_sider} key={getParentPathname(pathname)}>
            {this.siderHdRender(pathname)}
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
}

Sider.propTypes = {
  location: PropTypes.object.isRequired,
  articleCreating: PropTypes.bool.isRequired,
  createArticleItem: PropTypes.func.isRequired
}

export default Sider

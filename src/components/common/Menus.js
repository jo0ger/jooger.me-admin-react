import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const getMenus = (menuList = [], siderFold = false, parentPath = '/', topMenus = []) => {
  return menuList.map(item => {
    const linkTo = parentPath + item.key
    const hideText = siderFold && topMenus.indexOf(item.key) > -1
    return item.children ? (
          <Menu.SubMenu
            key={ linkTo }
            title={ <span>
              { item.icon ? <Icon type={ item.icon } /> : '' }
              { hideText ? '' : <span>{ item.name }</span> }
            </span> }>
            { getMenus(item.children, siderFold, `${linkTo}/`, topMenus) }
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={ linkTo }>
            <NavLink to={ linkTo }>
              { item.icon ? <Icon type={ item.icon } /> : '' }
              { hideText ? '' : <span>{ item.name }</span> }
            </NavLink>
          </Menu.Item>
        )
  })
}

class Menus extends Component {
  static propTypes = {
    theme: PropTypes.string.isRequired,
    siderFold: PropTypes.bool.isRequired,
    menuList: PropTypes.array.isRequired
  }

  static defaultProps = {
    menuList: []    
  }
  
  render () {
    const { siderFold, theme, menuList } = this.props
    const menuItems = getMenus(menuList, siderFold, '/', menuList.map(item => item.key))
    const pathname = location.pathname
    const onOpenChange = !siderFold ? {

    }: {}
    return (
      <Menu
        mode={ siderFold ? 'vertical' : 'inline' }
        theme={ theme }
        defaultSelectedKeys={[pathname !== '/' ? pathname : '/dashboard']}>
        { menuItems }
      </Menu>
    )
  }
}

export default Menus

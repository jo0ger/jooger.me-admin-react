import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import styles from './Header.styl'
import { menu } from '~config'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

// menu generator
const getMenus = (menuList = [], parentPath = '/') => {
  return menuList.map(item => {
    const linkTo = parentPath + item.key
    return item.children ? (
      <SubMenu
        key={ linkTo }
        title={ <span>
          { item.icon ? <Icon type={ item.icon } /> : '' }
          <span>{ item.name }</span>
        </span> }
      >
        { getMenus(item.children, `${linkTo}/`) }
      </SubMenu>
    ) : (
      item.hidden ? null :
      <MenuItem key={ linkTo }>
        <NavLink to={ linkTo } activeClassName="route--active">
          { item.icon ? <Icon type={ item.icon } /> : '' }
          <span>{ item.name }</span>
        </NavLink>
      </MenuItem>
    )
  })
}

export class Header extends Component {
  
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    showMenuPopover: false
  }

  switchMenuPopover = (visible) => {
    this.setState({ showMenuPopover: visible })
  }

  handleClickMenu = () => {
    // TODO handle user menu click
  }

  render () {
    const menuItems = getMenus(menu)
    const { pathname = '/' } = this.props.location
    return (
      <header className={styles['g-header']}>
        <div className={styles.logo} />
        <Menu
          className={styles.menus}
          theme="light"
          mode="horizontal"
          selectedKeys={[pathname !== '/' ? pathname : '/dashboard']}
        >
          { menuItems }
        </Menu>
        <div className={styles.rightWarpper}>
          <div className={styles.button}>
            <Icon type="mail" />
          </div>
          <Menu mode="horizontal" onClick={this.handleClickMenu}>
            <SubMenu style={{
              float: 'right'
            }} title={
              <span>
                <Icon type="user" />
                Jooger
              </span>
            }
            >
            <MenuItem key="logout">
              <a>注销</a>
            </MenuItem>
            </SubMenu>
          </Menu>
        </div>
      </header>
    )
  }

}

export default Header

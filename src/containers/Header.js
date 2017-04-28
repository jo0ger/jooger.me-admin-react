import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'

import Menus from '~components/Menus'

import { menu } from '~config'
import { toggleSider } from '~actions'
import { classnames } from '~utils'

class Header extends Component {
  static propTypes = {
    siderFold: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
    isNavbar: PropTypes.bool.isRequired,
    toggleSider: PropTypes.func.isRequired
  }

  state = {
    showMenuPopover: false
  }

  switchSider = () => {
    this.props.toggleSider(!this.props.siderFold)
  }

  switchMenuPopover = (visible) => {
    this.setState({ showMenuPopover: visible })
  }

  handleClickMenu = () => {

  }

  render () {
    const { siderFold, theme, isNavbar } = this.props
    const popoverMenuProps = {
      siderFold: false,
      theme: 'light',
      menuList: menu
    }
    return (
      <div className="header">
        {
          isNavbar ? (
            <Popover placement="bottomLeft"
              overlayClassName="popovermenu"
              onVisibleChange={this.switchMenuPopover}
              visible={this.state.showMenuPopover}
              trigger="click"
              content={
                <Menus {...popoverMenuProps}/>
              }>
              <div className={classnames('button', 'toggle')}>
                <Icon type="bars" />
              </div>
            </Popover>
          ) : (
            <div className={classnames('button', 'toggle')} onClick={this.switchSider}>
              <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
            </div>
          )
        }
        <div className="rightWarpper">
          <div className="button">
            <Icon type="mail" />
          </div>
          <Menu mode="horizontal" onClick={this.handleClickMenu}>
            <Menu.SubMenu style={{
              float: 'right'
            }} title={
              <span>
                <Icon type="user" />
              </span>
            }>
            <Menu.Item key="logout">
              <a>注销</a>
            </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </div>
    )
  }
}

const mapState2Props = state => {
  const { sider: {fold, theme}, header: {isNavbar} } = state.global
  return {
    siderFold: fold,
    theme,
    isNavbar
  }
}

const mapDispatch2Props = {
  toggleSider
}

export default connect(
  mapState2Props,
  mapDispatch2Props
)(Header)

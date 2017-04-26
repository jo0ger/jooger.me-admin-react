import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { menu } from '~config'
const AntdSider = Layout.Sider

class Sider extends Component {
  static propTypes = {
    collapsed: PropTypes.bool
  }

  render () {
    return (
      <AntdSider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}>
        <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">nav 4</span>
            </Menu.Item>
          </Menu>
      </AntdSider>
    )
  }
}

export default Sider

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { menu } from '~config'
const AntdHeader = Layout.Header

class Header extends Component {
  static propTypes = {
    collapsed: PropTypes.bool
  }

  render () {
    return (
      <AntdHeader style={{backgroundColor: '#fff', padding: 0}}>
        <Icon className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle} />
      </AntdHeader>
    )
  }
}

export default Header

import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button, Icon, Menu } from 'antd'
import { classnames, isType } from '~utils'

const MenuDevider = Menu.Divider

const DropOption = ({ menuIcon = '', menuText = null, menuStyle = {}, onMenuClick, menuOptions = [], buttonStyle = {}, buttonClass = {}, dropdownProps = {} }) => {
  const menu = menuOptions.map(item => (
    item.key === 'divider'
      ? <MenuDevider />
      : <Menu.Item style={menuStyle} {...item.props} key={item.key}>
          {item.name}
        </Menu.Item>
  ))
  const className = isType(buttonClass, 'object')
    ? {...buttonClass}
    : isType(buttonClass, 'array')
      ? [...buttonClass]
      : buttonClass
  return (
    <Dropdown
      overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
      {...dropdownProps}
    >
    <a className={classnames(className)} style={{ border: 'none', ...buttonStyle }}>
      <Icon type={menuIcon} />
      {menuText}
      <Icon type="down" />
    </a>
  </Dropdown>)
}

DropOption.propTypes = {
  menuText: PropTypes.string,
  onMenuClick: PropTypes.func.isRequired,
  menuOptions: PropTypes.array,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
}

export default DropOption

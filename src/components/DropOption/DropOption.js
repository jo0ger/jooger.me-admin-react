import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Icon, Menu } from 'antd'
import { classnames, buildClassName, noop } from '~utils'

const MenuDevider = Menu.Divider

const DropOption = ({
  menuIcon = '',
  menuText = null,
  menuStyle = {},
  onMenuClick = noop,
  menuOptions = [],
  buttonStyle = {},
  buttonClass = '',
  dropdownProps = {}
}) => {
  const menu = menuOptions.map(item => (
    item.key === 'divider'
      ? <MenuDevider />
      : <Menu.Item style={menuStyle} {...item.props} key={item.key}>
          {item.name}
        </Menu.Item>
  ))
  const className = buildClassName(buttonClass)

  return (
    <Dropdown
      placement="bottomCenter"
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
  menuIcon: PropTypes.string,
  menuText: PropTypes.string,
  menuStyle: PropTypes.object,
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array,
  buttonStyle: PropTypes.object,
  buttonClass: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  dropdownProps: PropTypes.object,
}

export default DropOption

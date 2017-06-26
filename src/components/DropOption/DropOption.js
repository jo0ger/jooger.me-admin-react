import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Icon, Menu } from 'antd'
import styles from './DropOption.styl'
import { classnames, buildClassName, noop } from '~utils'

const MenuDevider = Menu.Divider

const DropOption = ({
  menuIcon = '',
  menuElement = null,
  menuCustomElement = null,
  menuStyle = {},
  theme = 'dark',
  onMenuClick = noop,
  menuOptions = [],
  selectedKeys = [],
  buttonStyle = {},
  buttonClass = '',
  dropdownProps = {},
  placement = "bottomCenter",
  showArrow = true
}) => {
  const menu = menuOptions.map(item => (
    item.key === 'divider'
      ? <MenuDevider />
      : <Menu.Item style={menuStyle} {...item.props} key={item.key}>
          {
            item.icon ? <Icon className={styles.menu_item_icon} type={item.icon} /> : null
          }
          {item.name}
        </Menu.Item>
  ))
  const className = buildClassName(buttonClass)

  return (
    <Dropdown
      placement={placement}
      overlay={<Menu theme={theme} selectedKeys={selectedKeys} onClick={onMenuClick}>{menu}</Menu>}
      {...dropdownProps}
    >
    <a className={classnames(className)} style={{ border: 'none', ...buttonStyle }}>
      {
        menuIcon && <Icon type={menuIcon} />
      }
      {menuElement}
      {menuCustomElement}
      {showArrow && <Icon type="down" />}
    </a>
  </Dropdown>)
}

DropOption.propTypes = {
  menuIcon: PropTypes.string,
  menuElement: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  menuStyle: PropTypes.object,
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array,
  selectedKeys: PropTypes.array,
  buttonStyle: PropTypes.object,
  buttonClass: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  dropdownProps: PropTypes.object,
  theme: PropTypes.string,
  placement: PropTypes.string,
  showArrow: PropTypes.bool
}

export default DropOption

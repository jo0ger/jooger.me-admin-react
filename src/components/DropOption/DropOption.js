import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button, Icon, Menu } from 'antd'

const DropOption = ({ menuText = '', onMenuClick, menuOptions = [], buttonStyle = {}, dropdownProps = {} }) => {
  const menu = menuOptions.map(item => (
    <Menu.Item {...item.props} key={item.key}>
      {item.name}
    </Menu.Item>
  ))
  return (
    <Dropdown
    overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
    >
    <Button style={{ border: 'none', ...buttonStyle }}>
      {menuText}
      <Icon type="down" />
    </Button>
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

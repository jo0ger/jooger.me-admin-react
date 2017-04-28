import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import Menus from '~components/Menus'
import { menu } from '~config'
import { classnames } from '~utils'
import {
  changeTheme,
  toggleSider
} from '~actions'

class Sider extends Component {
  static propTypes = {
    fold: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
    changeTheme: PropTypes.func.isRequired
  }

  changeTheme = (val) => {
    this.props.changeTheme(val ? 'light' : 'dark')
  }

  render () {
    const { fold, theme } = this.props
    return (
      <aside className={classnames('sider', theme)}> 
        <div className="logo">
          <img src="https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png" alt="logo" type="image/x-icon"/>
          <span>Jooger</span>
        </div>
        <Menus 
          siderFold={ fold }
          theme={ theme }
          menuList={ menu }/>
        {
          !fold ? (
            <div className="switchtheme">
              <span><Icon type="bulb" />切换主题</span>
              <Switch
                defaultChecked={theme === 'light'}
                checkedChildren={'Dark'}
                unCheckedChildren={'Light'}
                onChange={this.changeTheme}/>
            </div>
          ) : ''
        }
      </aside>
    )
  }
}

const mapState2Props = (state) => {
  return state.global.sider
}

const mapDispatch2Props = {
  changeTheme,
  toggleSider
}

export default connect(
  mapState2Props,
  mapDispatch2Props
)(Sider)

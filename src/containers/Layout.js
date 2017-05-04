import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout as AntdLayout } from 'antd'

import Sider from './Sider'
import Header from './Header'
import Bread from '~components/common/Bread'
import Footer from './Footer'

import { debounce, classnames } from '~utils'
import {
  toggleNavbar
} from '~actions/global'

class Layout extends Component {
  static propTypes = {
    toggleNavbar: PropTypes.func.isRequired,
    isNavbar: PropTypes.bool.isRequired,
    siderFold: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired
  }

  componentWillMount () {
    this._windowResizeHandler = debounce(() => {
      this.props.toggleNavbar(document.body.clientWidth < 762)
    }, 200)
    window.addEventListener('resize', this._windowResizeHandler, false)
  }

  componentWillUnmount () {
    if (this._windowResizeHandler) {
      window.removeEventListener('resize', this._windowResizeHandler, false)
    }
  }
  
  

  render () {
    const { siderFold, isNavbar, theme } = this.props
    return (
      <div className={classnames(
        'app-layout',
        {
          'sider-fold': isNavbar ? false : siderFold,
          'with-navbar': isNavbar
        })}>
        {
          isNavbar ? '' : <Sider />
        }
        <div className="main">
          <Header />
          <Bread />
          <div className="container">
            <div className="content">
              { this.props.children }
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapState2Props = state => {
  const { sider, header } = state.global
  return {
    siderFold: sider.fold,
    theme: sider.theme,
    isNavbar: header.isNavbar
  }
}

const mapDispatch2Props = {
  toggleNavbar
}


export default connect(mapState2Props, mapDispatch2Props)(Layout)

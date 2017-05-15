import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import styles from './Main.styl'

const Content = Layout.Content

export const Main = ({ children = null, location }) => {

  
  
  return (
    <Content className={styles['g-main']}>
      <div className={styles.container}>
        { children }
      </div>
    </Content>
  )
}

Main.propTypes = {
  location: PropTypes.object.isRequired
}

export default Main

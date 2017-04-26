import React, { Component } from 'react'
import { Layout as AntdLayout } from 'antd'
// import Sider from './Sider'
import Header from './Header'
const { Sider } = AntdLayout

const Layout = () => {
  return (
    <AntdLayout className="app-layout">
      <Sider />
      <AntdLayout>
        <Header />
      </AntdLayout>
    </AntdLayout>
  )
}

export default Layout

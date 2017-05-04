import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Breadcrumb, Icon } from 'antd'
import { menu } from '~config'

let pathSet = []
const getPathSet = (menuList = [], parentPath = '/') => {
  menuList.forEach(({ key, name, icon, clickable, children }) => {
    pathSet[(parentPath + key).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + key,
      name: name,
      icon: icon || '',
      clickable: clickable === undefined,
    }
    if (children) {
      getPathSet(children, `${parentPath}${key}/`)
    }
  })
}

getPathSet(menu)

const BreadItem = ({ icon, text }) => {
  return (
    <Breadcrumb.Item>
      <Icon type={ icon } />
      <span>{ name }</span>
    </Breadcrumb.Item>
  )
}

const Bread = function ({ location }) {
  let breadList = []
  let pathNames = []
  location.pathname.substr(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push((`${pathNames[key - 1]}-${item}`).hyphenToHump())
    } else {
      pathNames.push((`-${item}`).hyphenToHump())
    }
  })
  breadList = pathNames.filter(item => item in pathSet)

  return (
    <div className="bread">
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/dashboard">
            <Icon type="home" />
            <span>首页</span>
          </NavLink>
        </Breadcrumb.Item>
        { breadList.map((item, index) => {
          const content = (
            <span>{pathSet[item].icon
              ? <Icon type={pathSet[item].icon} style={{ marginRight: 4 }} />
              : ''}{pathSet[item].name}</span>
          )
          return (
            <Breadcrumb.Item key={ index }>
              {((breadList.length - 1) !== index && pathSet[item].clickable)
                ? <NavLink to={pathSet[item].path}>
                    {content}
                </NavLink>
                : content}
            </Breadcrumb.Item>
          )
        }) }
      </Breadcrumb>
    </div>
  )
}

export default withRouter(Bread)

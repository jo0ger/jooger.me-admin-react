import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Breadcrumb, Icon } from 'antd'
import { menu } from '~config'
import { hyphenToHump } from '~utils'
import styles from './Bread.styl'

let pathSet = []
const getPathSet = (menuList = [], parentPath = '/') => {
  menuList.forEach(({ key, name, icon, clickable, children }) => {
    pathSet[hyphenToHump((parentPath + key).replace(/\//g, '-'))] = {
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

export const Bread = ({ location }) => {
  let breadList = []
  let pathNames = []
  location.pathname.substr(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push(hyphenToHump(`${pathNames[key - 1]}-${item}`))
    } else {
      pathNames.push(hyphenToHump(`-${item}`))
    }
  })
  breadList = pathNames.filter(item => item in pathSet)

  return (
    <div className={styles.bread}>
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

Bread.propTypes = {
  location: PropTypes.object.isRequired
}

export default Bread

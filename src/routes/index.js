import React from 'react'
import Bundle from '~components/Bundle'
import AppLayout from '~layouts/AppLayout'
import Home from './Home'
import PageNotFound from './PageNotFound'

const bundleAsyncRoute = ({ load, callback, ...rest }, Loading = null) => {
  return props => (
    <Bundle load={load} callback={callback} {...rest}>
      {Mod => Mod ? <Mod {...props} /> : Loading}
    </Bundle>
  )
}

export const createRoutes = store => {
  return {
    basename: '/',
    component: AppLayout,
    childRoutes: [
      {
        redirect: {
          from: '/',
          to: '/home',
          push: false
        }
      },
      {
        path: '/home',
        name: 'home',
        component: Home,
        exact: true
      },
      {
        name: 'pageNotFound',
        component: PageNotFound
      }
    ]
  }
}

export default createRoutes

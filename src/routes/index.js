import React from 'react'
import Bundle from '~components/Bundle'
import AppLayout from '~layouts/AppLayout'
import Home from './Home'
import CounterRoute from './Counter'
import ZenRoute from './Zen'
import PageNotFound from './PageNotFound'

const bundleAsyncRoute = (load, Loading = null) => {
  return (props) => (
    <Bundle load={load}>
      {(Mod) => Mod ? <Mod {...props} /> : Loading}
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
        path: '/counter',
        name: 'counter',
        component: bundleAsyncRoute(CounterRoute(store)),
        exact: true
      },
      {
        path: '/zen',
        name: 'zen',
        component: bundleAsyncRoute(ZenRoute(store)),
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

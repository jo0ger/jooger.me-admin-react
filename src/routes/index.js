import React from 'react'
import Bundle from '~components/Bundle'
import AppLayout from '~layouts/AppLayout'
import Login from './Login'
import Home from './Home'
import { AllArticleLoader } from './Article'
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
        redirect: {
          from: '/article',
          to: '/article/all',
          push: false
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        exact: true
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
        exact: true
      },
      {
        path: '/article/all',
        name: 'AllArticle',
        component: bundleAsyncRoute(AllArticleLoader(store)),
        exact: true
      },
      {
        path: '/article/category',
        name: 'Category',
        component: bundleAsyncRoute(AllArticleLoader(store)),
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

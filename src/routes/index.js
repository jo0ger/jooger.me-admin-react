import React from 'react'
import Bundle from '~components/Bundle'
import AppLayout from '~layouts/AppLayout'
import {
  AllArticlesRoute,
  ArticleDetailRoute,
  ArticleEditRoute
} from './Article'
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
          to: '/dashboard',
          push: false
        }
      },
      {
        path: '/article/all',
        name: 'allArticles',
        component: bundleAsyncRoute(AllArticlesRoute(store)),
        exact: true
      },
      {
        path: '/article/detail/:id',
        name: 'articleDetail',
        component: bundleAsyncRoute(ArticleDetailRoute(store)),
        exact: true
      },
      {
        path: '/article/edit/:id',
        name: 'articleEdit',
        component: bundleAsyncRoute(ArticleEditRoute(store)),
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

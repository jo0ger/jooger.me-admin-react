import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect 
} from 'react-router-dom'

import Layout from '~containers/Layout'
import pages from './pages'
import ArticleAll from './pages/ArticleAll'
import NotFound from '~components/common/NotFound'

export default (store) => {
  return (
    <Router>
      <Route render={(routeProps) => (
        <Layout {...routeProps}>
          <Switch>
            <Redirect from="/" to="/dashboard" exact />
            {
              pages.map((page, index) => (
                <Route {...page} key={ index } exact/>
              ))
            }
            <Route component={NotFound} />
          </Switch>
        </Layout>
      )}/>
    </Router>
  )
}

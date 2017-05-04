import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect 
} from 'react-router-dom'
import Layout from '~containers/Layout'
import pages from '~containers/pages'

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
          </Switch>
        </Layout>
      )}/>
    </Router>
  )
}

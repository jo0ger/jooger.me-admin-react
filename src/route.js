import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect 
} from 'react-router-dom'
import Layout from '~containers/Layout'
import DashBoard from '~containers/pages/DashBoard'

export default (store) => {
  return (
    <Router>
      <Route render={(routeProps) => (
        <Layout {...routeProps}>
          <Switch>
            <Redirect from="/" to="/dashboard" exact />
            <Route name="dashboard" path="/dashboard" component={DashBoard} exact />
          </Switch>
        </Layout>
      )}/>
    </Router>
  )
}

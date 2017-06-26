import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

class AppContainer extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    children: PropTypes.element // Just React DevTools
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  layoutRender = ({ location }) => {
    const { routes } = this.props
    const Layout = routes.component
    const childRoutes = routes.childRoutes

    return (
      <Layout>
        <Switch>
          {
            childRoutes.map((route, index) => {
              return (
                route.redirect ? (
                  <Redirect {...route.redirect} key={index} exact />
                ) : (
                  <Route {...route} key={index} />
                )
              )
            })
          }
        </Switch>
      </Layout>
    )
  }
  
  render () {
    const { store, routes, children } = this.props

    return (
      <Provider store={store}>
        <div className="app">
          <Router basename={routes.basename || '/'}>
            <Route render={this.layoutRender} />
          </Router>
          { children }
        </div>
      </Provider>
    )
  }

}

export default AppContainer

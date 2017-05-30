import React from 'react'
import { render } from 'react-dom'
import AppContainer from '~containers/AppContainer'
import createRoutes from '~routes'
import createStore from '~store/createStore'
import '~styles/index'

const MOUNT_NODE = document.getElementById('root')

const renderApp = (DevTools = null) => {
  const store = createStore()
  const routes = createRoutes(store)
  
  if (__DEV__) {
    // const DevTools = require('~components/DevTools').default
    render(
      <AppContainer store={store} routes={routes}>
        {/*<DevTools />*/}
      </AppContainer>,
      MOUNT_NODE
    )
  } else {
    render(
      <AppContainer store={store} routes={routes} />,
      MOUNT_NODE
    )
  }

}


// ========================================================
// Developer Tools Setup
// ========================================================
// if (__DEV__) {
//   if (window.devToolsExtension) {
//     window.devToolsExtension.open()
//   }
// }

// START RENDER APP
renderApp()

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from '~routes'
import createStoreWithMiddleware from '~store'
import './assets/stylus/main.styl'

const root = document.getElementById('root')
const store = createStoreWithMiddleware()

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('~components/common/DevTools').default
  render(
    <Provider store={store} key="provider">
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>,
    root
  )
} else {
  render(
    <Provider store={store} key="provider">
      <App />
    </Provider>,
    root
  )
}


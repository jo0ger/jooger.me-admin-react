import React from 'react'
import { withRouter } from 'react-router-dom'
import '../assets/pageNotFound'
import NotFoundImage from '../assets/404.jpg'

export const PageNotFound = ({ history }) => {
  return (
    <div className="container">
      <h1>Page not found!!!</h1>
      <h3>
        <a className="link" onClick={history.goBack}>Back</a>
      </h3>
      <img src={NotFoundImage} alt="IMG" />
    </div>
  )
}

export default withRouter(PageNotFound)

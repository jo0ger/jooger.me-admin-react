import React from 'react'
import PropTypes from 'prop-types'

export const Zen = ({ zen: { fetching, text }, fetchZen, clearZen }) => {
  return (
    <div>
      <div className="loading">
        {
          fetching ? 'loading' : ''
        }
      </div>
      <div>
        <button className="btn btn-default" onClick={fetchZen}>
          {
            fetching ? 'Fetching' : 'Fetch'
          }
        </button>
        <button className="btn btn-default" onClick={clearZen}>Clear</button>
      </div>
      <div>
      {
        text.map(({ id, text }) => (
          <h1 key={id}>{ text }</h1>
        ))
      }
      </div>
    </div>
  )
}

Zen.propTypes = {
  zen: PropTypes.object.isRequired
}

export default Zen

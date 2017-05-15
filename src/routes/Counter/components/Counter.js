import React from 'react'
import PropTypes from 'prop-types'
import '../assets/counter'

export const Counter = (props) => {
  return (
    <div className="counter">
      <h2>Counter: {props.counter}</h2>
      <button className="btn btn-default" onClick={props.increment}>
        Increment
      </button>
      {' '}
      <button className="btn btn-default" onClick={props.doubleAsync}>
        Double (Async)
      </button>
    </div>
  )
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired
}

export default Counter

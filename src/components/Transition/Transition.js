import React from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './Transition.styl'

export const Transition = ({
  children,
  name = '',
  appear = true,
  appearTimeout = 300,
  enter = true,
  leave = true,
  enterTimeout = 300,
  leaveTimeout = 300
}) => {
  return (
    <CSSTransitionGroup
      transitionName={name}
      transitionAppear={appear}
      transitionAppearTimeout={appearTimeout}
      transitionEnter={enter}
      transitionLeave={leave}
      transitionEnterTimeout={enterTimeout}
      transitionLeaveTimeout={leaveTimeout}
    >
      {children}
    </CSSTransitionGroup>
  )
}

Transition.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  appear: PropTypes.bool,
  appearTimeout: PropTypes.number,
  enter: PropTypes.bool,
  enterTimeout: PropTypes.number,
  leave: PropTypes.bool,
  leaveTimeout: PropTypes.number,
}

export default Transition

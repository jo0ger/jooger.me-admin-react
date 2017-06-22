import { Component } from 'react'
import { is } from 'immutable'

const keys = Object.keys

export class BaseComponent extends Component {

  shouldComponentUpdate(nextProps = {}, nextState = {}) {
      const thisProps = this.props || {}
      const thisState = this.state || {}
      if (keys(thisProps).length !== keys(nextProps) || keys(thisState).length !== keys(nextState)) {
        return true
      }
      for (const key in nextProps) {
        if (!is(thisProps[key], nextProps[key])) {
          return true;
        }
      }

      for (const key in nextState) {
        if (!is(thisState[key], nextState[key])) {
          return true;
        }
      }
      return false
  }
  
}

export default BaseComponent

import { Component } from 'react'
import PropTypes from 'prop-types'

// see https://reacttraining.cn/web/guides/code-splitting
export class Bundle extends Component {

  static propTyps = {
    load: PropTypes.node.isRequired,
    preload: PropTypes.func,
    callback: PropTypes.func
  }

  state = {
    // the short for 'module'
    mod: null
  }
  
  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }
  
  load (props) {
    this.setState({ mod: null })
    this.props.preload && this.props.preload()
    props.load(mod => {
      // handle both es imports and commonjs
      mod = mod.default ? mod.default : mod
      this.setState({ mod }, () => {
        this.props.callback && this.props.callback(mod)
      })
    })
  }

  render () {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }

}

export default Bundle

import { Component } from 'react'
import PropTypes from 'prop-types'

// see https://reacttraining.cn/web/guides/code-splitting
export class Bundle extends Component {

  static propTyps = {
    load: PropTypes.node.isRequired
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
    props.load(mod => {
      this.setState({
        // handle both es imports and commonjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render () {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }

}

export default Bundle

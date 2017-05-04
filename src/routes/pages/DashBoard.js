import React, { Component } from 'react'
import Service from '~service'

class DashBoard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      stat: {}
    }
  }

  componentWillMount () {
    this.fetchStat()
  }

  async fetchStat () {
    let { code, data } = await Service.stat.getStat()

    if (!code) {
      this.setState({ stat: { ...data.count } })
    }
  }
  
  render () {
    return (
      <div className="content-inner">{ this.state.stat.article }</div>
    )
  }
}

export default DashBoard

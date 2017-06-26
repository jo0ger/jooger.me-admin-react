import React from 'react'
import PropTypes from 'prop-types'
import { Input, Col, Button, Icon } from 'antd'
import BaseComponent from '~components/BaseComponent'
import styles from './Extends.styl'

const InputGroup = Input.Group

export class Extends extends BaseComponent {

  constructor (props) {
    super(props)
    this.state = {
      model: this.props.extendsModel
    }
  }

  handleChangeExtends = _extends => {
    this.setState({
      model: _extends
    }, () => this.props.onChange(this.state.model))
  }

  handleAddExtendsItem = () => {
    this.handleChangeExtends([
      ...this.state.model,
      { key: '', value: '' }
    ])
  }

  handleExtendsItemInputChange = (index, type) => e => {
    const _extends = [...this.state.model]
    _extends.splice(index, 1, {
      ..._extends[index],
      [type]: e.target.value
    })
    this.handleChangeExtends(_extends)
  }

  handleRemoveExtendsItem = index => () => {
    const _extends = [...this.state.model]
    _extends.splice(index, 1)
    this.handleChangeExtends(_extends)
  }

  render () {
    return (
      <div className={styles.extends_wraper}>
        {
          this.state.model.map((item, index) => (
            <InputGroup className={styles.extends_item} key={index}>
              <Col span="6">
                <Input placeholder="key" value={item.key} onChange={this.handleExtendsItemInputChange(index, 'key')} />
              </Col>
              <Col span="6">
                <Input placeholder="value" value={item.value} onChange={this.handleExtendsItemInputChange(index, 'value')} />
              </Col>
              <Col span="2">
                <Button type="danger" icon="delete" onClick={this.handleRemoveExtendsItem(index)} />
              </Col>
            </InputGroup>
          ))
        }
        <Button className={styles.extends_add} type="dashed" onClick={this.handleAddExtendsItem} style={{ width: '40%' }}>
          <Icon type="plus" /> 增加扩展
        </Button>
      </div>
    )
  }
}

Extends.propTypes = {
  extendsModel: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Extends

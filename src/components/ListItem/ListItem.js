import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './ListItem.styl'
import { buildClassName, classnames } from '~utils'

export class ListItem extends PureComponent {

  handleDbClick = e => this.props.onSelected && this.props.onSelected(this.props.id)

  setEl = node => this._el = node

  render () {
    const {
      customClassName,
      children,
      selected = false,
      selectedClassName
    } = this.props

    return (
      <div
        className={classnames({
          [styles.list_item]: true,
          ...buildClassName(customClassName),
          [selectedClassName || styles.item_selected]: selected
        })}
        ref={this.setEl}
        onDoubleClick={this.handleDbClick}
      >
        {children}
      </div>
    )
  }

}

ListItem.propTypes = {
  customClassName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  selected: PropTypes.bool,
  selectedClassName: PropTypes.string,
  onSelected: PropTypes.func,
  onActive: PropTypes.func
}

export default ListItem

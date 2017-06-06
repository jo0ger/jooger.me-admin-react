import React,{ PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './InfiniteScroll.styl'
import { buildClassName, classnames } from '~utils'

export class InfiniteScroll extends PureComponent {

  componentDidMount() {
    this.bindDOMEvent()
  }

  componentWillUnmount() {
    this.unbindDOMEvent()
  }

  setScrollContainer = el => this._scrollContainer = el
  

  bindDOMEvent () {
    const { onLoadmore, loading } = this.props
    if (onLoadmore && this._scrollContainer) {
      this._scrollHandler = e => {
        if (loading) {
          return
        }
        const { target } = e
        if (target.clientHeight + target.scrollTop >= target.scrollHeight) {
          onLoadmore(e)
        }
      }
      this._scrollContainer.addEventListener('scroll', this._scrollHandler, false)
    }
  }

  unbindDOMEvent () {
    this._scrollContainer.removeEventListener('scroll', this._scrollHandler, false)
  }
  
  render () {
    const { children, customClassName = '' } = this.props
    return (
      <div
        className={classnames({
          [styles.infinite_scroll]: true,
          ...buildClassName(customClassName)
        })}
        ref={this.setScrollContainer}
      >
        {children}
      </div>
    )
  }
}

InfiniteScroll.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  customClassName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  onLoadmore: PropTypes.func,
  loading: PropTypes.bool
}

export default InfiniteScroll

import React,{ PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './InfiniteScroll.styl'
import { Loading, RefreshLoading } from '~components/Loading'
import { buildClassName, classnames } from '~utils'

export class InfiniteScroll extends PureComponent {

  static defaultProps = {
    loading: false,
    refreshing: false,
    customClass: '',
    loadingCustomClass: '',
    refreshLoadingCustomClass: '',
    noMoreData: false
  }

  componentDidMount() {
    this.bindDOMEvent()
  }

  componentWillUnmount() {
    this.unbindDOMEvent()
  }

  setScrollContainer = el => this._scrollContainer = el
  

  bindDOMEvent () {
    const { onLoadmore, loading, refreshing, noMoreData } = this.props
    if (onLoadmore && this._scrollContainer) {
      this._scrollHandler = e => {
        if (loading　|| refreshing || noMoreData) {
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
    const { children, refreshing, loading, customClass, loadingCustomClass, refreshLoadingCustomClass } = this.props
    return (
      <div
        className={classnames({
          [styles.infinite_scroll]: true,
          ...buildClassName(customClass)
        })}
        ref={this.setScrollContainer}
      >
        {children}
        <RefreshLoading className={classnames(buildClassName(refreshLoadingCustomClass))} loading={refreshing} />
        <Loading className={classnames(buildClassName(loadingCustomClass))} loading={loading} />
      </div>
    )
  }
}

InfiniteScroll.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  customClass: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  onLoadmore: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  loadingCustomClass: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  refreshLoadingCustomClass: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  noMoreData: PropTypes.bool
}

export default InfiniteScroll

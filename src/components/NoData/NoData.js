import React from 'react'
import PropTypes from 'prop-types'
import styles from './NoData.styl'
import { classnames } from '~utils'

export const NoData = (props) => {
  const { show = true, icon = 'no-data', text = 'NO DATA', iconSize = 66, textSize = 16 } = props
  
  if (!show) {
    return null
  }

  return (
    <div className={styles.no_data} style={{fontSize: textSize}}>
      <i className={classnames(styles.no_data_icon, 'iconfont', `icon-${icon}`)} style={{fontSize: iconSize}} />
      {
        text ? <span>{text}</span> : null
      }
    </div>
  )
}

NoData.propTypes = {
  show: PropTypes.bool,
  icon: PropTypes.string,
  text: PropTypes.string,
  iconSize: PropTypes.number,
  textSize: PropTypes.number
}

export default NoData

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './MarkdownEditor.styl'
import { classnames } from '~utils'

const commandList = [
  { key: 'bold', title: '加粗' },
  { key: 'italic', title: '斜体' },
  { key: 'underline', title: '下划线' },
  { key: 'h1', title: 'H1' },
  { key: 'h2', title: 'H2' },
  { key: 'h3', title: 'H3' },
  { key: 'code', title: '代码' },
  { key: 'link', title: '链接' },
  { key: 'image', title: '图片' },
  { key: 'preview', title: '预览' },
  { key: 'compare', title: '对照' },
  { key: 'grow', title: '全屏' },
  { key: 'shrink', title: '缩放' }
]

export class MarkdownEditor extends Component {

  constructor (props) {
    super(props)
    this.state = {
      editContent: props.content,
      fullscreenMode: false,
      previewMode: false,
      compareMode: true
    }
  }

  handleCommandClick = key => () => {
    switch (key) {
      case 'grow':
        this.setState({ fullscreenMode: true })
        break
      case 'shrink':
        this.setState({ fullscreenMode: false })
        break
      case 'preview':
        this.setState({ previewMode: !this.state.previewMode })
        this.setState({ compareMode: false })
        break
      case 'compare':
        this.setState({ compareMode: !this.state.compareMode })
        this.setState({ previewMode: false })
        break
      default:
        break
    }
  }

  render () {
    const { fullscreenMode, previewMode, compareMode } = this.state
    return (
      <div className={classnames({
          [styles.markdown_editor]: true,
          [styles.fullscreen_mode]: fullscreenMode,
          [styles.preview_mode]: previewMode,
          [styles.compare_mode]: compareMode
        })}
      >
        <div className={styles.hd}>
          <ul className={styles.command_list}>
            {
              commandList.map(item => {
                const itemClass = `command_item_${item.key}`
                if ((fullscreenMode && item.key === 'grow') || (!fullscreenMode && item.key === 'shrink')) {
                  return null
                }
                return (
                  <li
                    key={item.key}
                    className={classnames([styles.command_item, styles[itemClass] || itemClass])} 
                    title={item.title}
                    onClick={this.handleCommandClick(item.key)}
                  >
                    <i className={classnames(['iconfont', `icon-${item.key}`])} />
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className={styles.bd}>
          <div className={styles.left}></div>
          <div className={styles.right}></div>
        </div>
      </div>
    )
  }
}

MarkdownEditor.propTypes = {
  content: PropTypes.string
}

export default MarkdownEditor


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './MarkdownEditor.styl'
import { classnames, marked, debounce } from '~utils'
import { getSelection, setSelection } from '~utils/markdownEditorHelper/selectionHelper'
import commands from '~utils/markdownEditorHelper/commands'

const defaultCommands = commands.getDefaultCommands()

export class MarkdownEditor extends Component {

  static defaultProps = {
    commands: defaultCommands,
    customClass: '',
    bodyHeight: null,
    mini: false,
    autoCompare: true
  }

  constructor (props) {
    super(props)
    this.state = {
      fullscreenMode: false,
      previewMode: false,
      compareMode: props.autoCompare,
      previewContent: ''
    }
    this.setPreviewContent = this.getPreviewContentDebounceFn()
  }
  
  componentWillMount() {
    this.setPreviewContent()
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setPreviewContent(nextProps.value)
    }
  }

  setTextarea = node => this._textarea = node

  getPreviewContentDebounceFn () {
    return debounce((content = this.props.value) => {
      const { previewMode, compareMode } = this.state
      if (previewMode || compareMode) {
        this.setState({
          previewContent: (content && marked(content)) || ''
        })
      }
    }, 200)
  }

  handleCommandClick = cmd => () => {
    switch (cmd.key) {
      case 'grow':
        this.setState({ fullscreenMode: true })
        break
      case 'shrink':
        this.setState({ fullscreenMode: false })
        break
      case 'preview':
        this.setState({
          previewMode: !this.state.previewMode,
          compareMode: false
        }, () => this.setPreviewContent())
        break
      case 'compare':
        this.setState({
          compareMode: !this.state.compareMode,
          previewMode: false
        }, () => this.setPreviewContent())
        break
      default:
        this.executeCommand(cmd)
        break
    }
  }

  handleValueChange = e => this.props.onChange(e.target.value)

  executeCommand (cmd) {
    const { value } = this.props
    const newValue = cmd.execute ? cmd.execute(value, getSelection(this._textarea)) : null
    if (!newValue) {
      return
    }
    
    this._textarea.focus()
    setSelection(this._textarea, 0, this._textarea.value.length)
    document.execCommand('insertText', false, newValue.text)
    setSelection(this._textarea, newValue.selection[0], newValue.selection[1])
  }

  render () {
    const { fullscreenMode, previewMode, compareMode, previewContent } = this.state
    const { commands, value, customClass, bodyHeight, mini } = this.props
    
    return (
      <div className={classnames({
          [styles.markdown_editor]: true,
          [styles.mini_mode]: mini,
          [styles.fullscreen_mode]: fullscreenMode,
          [styles.preview_mode]: previewMode,
          [styles.compare_mode]: compareMode,
          [customClass]: true
        })}
      >
        {
          !commands.length
            ? null
            : (
                <div className={styles.hd}>
                  <ul className={styles.command_list}>
                    {
                      commands.map(item => {
                        const itemClass = `command_item_${item.key}`
                        if ((fullscreenMode && item.key === 'grow') || (!fullscreenMode && item.key === 'shrink')) {
                          return null
                        }
                        return (
                          <li
                            key={item.key}
                            className={classnames([styles.command_item, styles[itemClass] || itemClass, item.customClass])}
                            title={item.title}
                            onClick={this.handleCommandClick(item)}
                          >
                            <i className={classnames(['iconfont', `icon-${item.key}`])} />
                            {
                              item.text && <span>{item.text}</span>
                            }
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              )
        }
        <div className={styles.bd} style={{height: bodyHeight}}>
          <div className={styles.edit_pane}>
            <textarea
              className={styles.input_area}
              onChange={this.handleValueChange}
              value={value}
              ref={this.setTextarea}
            />
          </div>
          <div className={classnames([styles.preview_pane, 'markdown_body'])} dangerouslySetInnerHTML={{__html: previewContent}} />
        </div>
      </div>
    )
  }
}

MarkdownEditor.propTypes = {
  commands: PropTypes.array,
  value: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  bodyHeight: PropTypes.number,
  mini: PropTypes.bool,
  autoCompare: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default MarkdownEditor


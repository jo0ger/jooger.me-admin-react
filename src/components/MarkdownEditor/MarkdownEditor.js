import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './MarkdownEditor.styl'
import { classnames, marked, debounce } from '~utils'
import commandList from '~utils/markdownEditorHelper/commands'
import { getSelection, setSelection } from '~utils/markdownEditorHelper/selectionHelper'

export class MarkdownEditor extends Component {

  constructor (props) {
    super(props)
    this.state = {
      editContent: props.content,
      fullscreenMode: false,
      previewMode: false,
      compareMode: true,
      previewContent: ''
    }
    this.setPreviewContent = this.getPreviewContentDebounceFn()
  }
  
  componentWillMount() {
    this.setPreviewContent(this.props.value.text)
  }
  
  componentWillReceiveProps (nextProps) {
    const { text } = nextProps.value
    if (text !== this.props.value.text) {
      this.setPreviewContent(text)
    }
  }

  setTextarea = node => this._textarea = node

  getPreviewContentDebounceFn () {
    return debounce((content = '') => {
      this.setState({
        previewContent: marked(content)
      })
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
        this.setState({ previewMode: !this.state.previewMode })
        this.setState({ compareMode: false })
        break
      case 'compare':
        this.setState({ compareMode: !this.state.compareMode })
        this.setState({ previewMode: false })
        break
      default:
        this.executeCommand(cmd)
        break
    }
  }

  handleValueChange = e => this.props.onChange(e.target.value)

  executeCommand (cmd) {
    const { value: { text } } = this.props
    const newValue = cmd.execute ? cmd.execute(text, getSelection(this._textarea)) : null
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
    const { value: { text } } = this.props

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
                    onClick={this.handleCommandClick(item)}
                  >
                    <i className={classnames(['iconfont', `icon-${item.key}`])} />
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className={styles.bd}>
          <div className={styles.edit_pane}>
            <textarea
              className={styles.input_area}
              onChange={this.handleValueChange}
              value={text}
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
  content: PropTypes.string,
  value: PropTypes.shape({
    text: PropTypes.string.isRequired,
    selection: PropTypes.arrayOf(PropTypes.number)
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

export default MarkdownEditor


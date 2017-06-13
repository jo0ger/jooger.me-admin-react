import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MarkdownEditor from '~components/MarkdownEditor'
import styles from './CommentInputBox.styl'
import commands from '~utils/markdownEditorHelper/commands'
import { classnames } from '~utils'

export class CommentInputBox extends Component {

  static defaultProps = {
    height: 200,
    toArticle: false
  }

  state = {
    commentValue: '',
    mdeCommands: commands.extend([
      {
        key: 'reply',
        title: '回复',
        text: '回复',
        customClass: styles.md_reply,
        execute: (value, selection) => {
          this.handleSubmitReply()
        }
      }
    ])
  }

  handleCommentValueChange = value => (this.setState({ commentValue: value }))

  handleSubmitReply = () => this.props.onSubmit(this.state.commentValue, () => this.setState({ commentValue: '' }))

  render () {
    const { commentValue, mdeCommands } = this.state
    const { height, toArticle } = this.props

    return (
      <div className={classnames([styles.comment_input_box, (toArticle && styles.to_article_input_box) || ''])}>
        <MarkdownEditor
          commands={mdeCommands}
          value={commentValue}
          customClass={styles.mde}
          bodyHeight={height - 25}
          mini
          autoCompare={false}
          onChange={this.handleCommentValueChange}
        />
      </div>
    )
  }

}

CommentInputBox.propTypes = {
  height: PropTypes.number,
  toArticle: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
}

export default CommentInputBox

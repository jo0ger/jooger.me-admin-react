import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'

export class ArticleEdit extends Component {
  static defaultProps = {
    match: PropTypes.object.isRequired,
    articleDetail: PropTypes.object.isRequired,
    defailtFetching: PropTypes.bool.isRequired,
    defailtSaving: PropTypes.bool.isRequired,
    fetchArticleDetail: PropTypes.func.isRequired
  }

  state = {
    articleModel: {}
  }
  
  componentWillMount() {
    const articleId = this.props.match.params.id
    this.props.fetchArticleDetail(articleId).then(code => {
      if (!code) {
        this.setState({
          articleModel: this.props.articleDetail
        })
      }
    })
  }
  

  render () {
    return <div></div>
  }

}

export default ArticleEdit

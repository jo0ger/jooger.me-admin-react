import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../assets/ArticleDetail'

export class ArticleDetail extends Component {
  render () {
    return (
      <div className={styles.article_detail}>
        <div className={styles.hd}></div>
      </div> 
    )
  }
}

ArticleDetail.propTypes = {
  currentArticle: PropTypes.object
}

export default ArticleDetail

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItem from '~components/ListItem'
import styles from '../assets/ArticleList'

export class ArticleList extends Component {
  render () {
    const { articleList } = this.props
    return (
      <div className={styles.article_list}>
        {
          articleList.map((item, index) => (
            <ListItem key={item._id}>
              <span>{item.title}</span>
            </ListItem>
          ))
        }
      </div>
    )
  }
}

ArticleList.propTypes = {
  articleList: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired
}

export default ArticleList

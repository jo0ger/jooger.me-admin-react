import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tag, Icon } from 'antd'
import ListItem from '~components/ListItem'
import DropOption from '~components/DropOption'
import styles from '../assets/ArticleList'
import { classnames, fmtDate } from '~utils'

const findCategoryExtendsItemValue = (extendsList = [], key = '') => {
  const matchedItem = extendsList.find(item => item.key === key)
  return matchedItem ? matchedItem.value : null
}

const allToolMenus = [
  { key: 'upblish', name: '发布', status: 1 },
  { key: 'draft', name: '草稿箱', status: 0 },
  { key: 'delete', name: '回收站', status: -1 }
]

const getcurrentToolMenus = (status) => allToolMenus.filter(item => item.status !== status || item.status === 'always')

export class ArticleList extends Component {

  handleItemActive = id => {
  }

  handleItemSlected = id => this.props.onItemSelected(id)

  handleToolMenuClick = (item, key, keyPath) => {
    console.log(item, key, keyPath)
  }

  render () {
    const { articleList, currentId } = this.props
    return (
      <div className={styles.article_list}>
        {
          articleList.map((item, index) => (
            <ListItem
              customClassName={classnames({
                [styles.article_item]: true,
                [styles.published]: item.state === 1,
                [styles.drafted]: item.state === 0,
                [styles.deleted]: item.state === -1
              })}
              key={item._id}
              id={item._id}
              selected={currentId === item._id}
              onSelected={this.handleItemSlected}
              onActive={this.handleItemActive}
            >
              <div className={styles.hd}>
                {
                  item.category
                    ? <Tag
                        className={styles.category}
                        color={findCategoryExtendsItemValue(item.category.extends, 'color')}
                      >
                        {item.category.name}
                      </Tag>
                    : null
                }
                <div className={styles.title}>
                  <span>{item.title}</span>
                </div>
                <div className={styles.tool}>
                  <DropOption
                    menuOptions={getcurrentToolMenus(item.state)}
                    buttonStyle={{ width: 20, textAlign: 'center' }}
                    onMenuClick={this.handleToolMenuClick}
                  />
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.create_time} title={`创建时间：${fmtDate(item.create_at)}`}>
                  <Icon type="clock-circle-o" />
                  <span className={styles.text}>{fmtDate(item.create_at)}</span>
                </div>
                <div className={styles.update_time} title={`最后更新时间：${fmtDate(item.update_at)}`}>
                  <Icon type="edit" />
                  <span className={styles.text}>{fmtDate(item.update_at)}</span>
                </div>
              </div>
              <div className={styles.meta}>
                
              </div>
            </ListItem>
          ))
        }
      </div>
    )
  }
}

ArticleList.propTypes = {
  articleList: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  currentId: PropTypes.string.isRequired,
  onItemSelected: PropTypes.func
}

export default ArticleList

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Tag, Icon } from 'antd'
import BaseComponent from '~components/BaseComponent'
import ListItem from '~components/ListItem'
import DropOption from '~components/DropOption'
import styles from '../assets/ArticleList'
import { classnames, fmtDate, findExtendsItemValue} from '~utils'

const allToolMenus = [
  { key: 'publish', name: '发布', status: 1 },
  { key: 'draft', name: '草稿箱', status: 0 },
  { key: 'delete', name: '回收站', status: -1 }
]

const getcurrentToolMenus = status => allToolMenus.filter(item => item.status !== status || item.status === 'always')

export class ArticleList extends BaseComponent {

  handleItemSlected = id => this.props.onItemSelected(id)

  handleToolMenuClick = id => item => this.props.onToolClick(item.key, id)

  handleForeverDeleteItem = id => () => this.props.onForeverDeleteItem(id)

  render () {
    const { articleList, currentArticleId } = this.props
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
              selected={currentArticleId === item._id}
              onSelected={this.handleItemSlected}
            >
              <div className={styles.hd}>
                {
                  item.category
                    ? <Link to={`/article/category/${item.category.name}`}>
                        <Tag
                          className={styles.category}
                          color={findExtendsItemValue(item.category.extends, 'color')}
                        >
                          {item.category.name}
                        </Tag>
                      </Link>
                    : null
                }
                <div className={styles.title}>
                  <span title={item.title}>{item.title}</span>
                </div>
                <div className={styles.tool}>
                  <DropOption
                    menuOptions={getcurrentToolMenus(item.state)}
                    buttonStyle={{ width: 20, textAlign: 'center' }}
                    onMenuClick={this.handleToolMenuClick(item._id)}
                  />
                  <Icon type="delete" className={styles.remove_btn} title="永久删除" onClick={this.handleForeverDeleteItem(item._id)} />
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
              <div className={styles.meta} />
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
  currentArticleId: PropTypes.string.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onToolClick: PropTypes.func.isRequired,
  onForeverDeleteItem: PropTypes.func.isRequired
}

export default ArticleList

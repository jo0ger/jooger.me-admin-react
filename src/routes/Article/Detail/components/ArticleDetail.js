import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Form } from 'antd'
import styles from '../assets/articleDetail'
import Service from '~service'
import { fmtDate } from '~utils'

const FormItem = Form.Item

const formOptions = [
  { key: '_id', label: 'ID' },
  { key: 'title', label: '标题' },
  { key: 'create_at', label: '发布时间' },
  { key: 'update_at', label: '修改时间' },
  { key: 'category', label: '分类' },
  { key: 'tag', label: '标签' },
  { key: 'keywords', label: '关键词' },
  { key: 'visit', label: '浏览数' },
  { key: 'likes', label: '喜欢数' },
  { key: 'comments', label: '评论数' },
  { key: 'extends', label: '其他属性' },
  { key: 'excerpt', label: '摘要' }
]

const infoTextStyleName = styles['info-item-text']

const getBasicInfoItem = (key = '', articleDetail) => {
  switch (key) {
    case 'create_at':
    case 'update_at':
      return <span className={infoTextStyleName}>{fmtDate(articleDetail[key])}</span>
    case 'category':
      return <span className={infoTextStyleName}>{articleDetail[key].name}</span>
    case 'tag':
      return articleDetail.tag.map(item => (
        <span className={infoTextStyleName}>{item.name}</span>
      ))
    case 'keywords':
      return articleDetail.keywords.map(item => <span className={infoTextStyleName}>{item}</span>)
    case 'visit':
    case 'likes':
    case 'comments':
      return <span className={infoTextStyleName}>{articleDetail.meta[key]}</span>
    case 'extends': 
      return articleDetail.extends.map(item => (
        <span className={infoTextStyleName}>{item.key + ':' + item.value}</span>
      ))
    default:
      return <span className={infoTextStyleName}>{articleDetail[key]}</span>
  }
}

export class ArticleDetail extends PureComponent {

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  state = {
    articleDetail: {}
  }

  componentWillMount () {
    console.log(this.props)
    this._fetchArticleDetail()
  }

  _fetchArticleDetail () {
    const articleId = this.props.match.params.id
    Service.article.getItem(articleId)({}).then(({ code, data }) => {
      if (!code) {
        this.setState({ articleDetail: data })
      }
    })
  }
  
  render () {
    const { articleDetail } = this.state

    return (
      <div className={styles['page-article-detail']}>
        <Row gutter={16}>
          <Col span={6}>
            <Card title={<h4>文章基本信息</h4>}>
              {
                articleDetail._id ? (
                  formOptions.map(item => (
                    <FormItem
                      key={item.key}
                      label={item.label}
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                    >
                      {getBasicInfoItem(item.key, articleDetail)}
                    </FormItem>
                  ))
                ) : null
              }
            </Card>
          </Col>
          <Col span={18}>
            <Card title={<h4></h4>}>
              <Form>
                <FormItem label="">

                </FormItem>

              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ArticleDetail

import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Affix, Row, Col, Form, Tag, Icon, Button } from 'antd'
import styles from '../assets/articleDetail'
import Service from '~service'
import { fmtDate } from '~utils'
import globalStyles from '~styles/index'

const FormItem = Form.Item

const formBasicOptions = [
  { key: '_id', label: 'ID' },
  { key: 'title', label: '标题' },
  { key: 'excerpt', label: '摘要' },
  { key: 'create_at', label: '发布时间' },
  { key: 'update_at', label: '修改时间' },
  { key: 'category', label: '分类' },
  { key: 'tag', label: '标签' },
  { key: 'keywords', label: '关键词' },
  { key: 'visit', label: '浏览数' },
  { key: 'likes', label: '喜欢数' },
  { key: 'comments', label: '评论数' },
  { key: 'extends', label: '扩展项' }
]

const infoTextStyleName = styles['info-item-text']
const noDataItem = <span className={infoTextStyleName}>---</span>

const getBasicInfoItem = (key = '', articleDetail) => {
  switch (key) {
    case 'create_at':
    case 'update_at':
      return <span className={infoTextStyleName}>{fmtDate(articleDetail[key])}</span>
    case 'category':
      const _extends = articleDetail[key] ? articleDetail[key].extends : []
      const _color = _extends.find(item => item.key === 'color') || {}
      return articleDetail[key] && articleDetail[key].name
        ? <Tag color={_color.value || 'blue'}>{ articleDetail[key].name }</Tag>
        : noDataItem
    case 'tag':
      return articleDetail.tag.length
        ? articleDetail.tag.map(item => {
          let _color = item.extends.find(item => item.key === 'color') || {}
          let _icon = item.extends.find(item => item.key === 'icon') || {}
          return <Tag color={_color.value || 'blue'} key={item._id}><Icon type={_icon.value} />{ item.name }</Tag>
        })
        : noDataItem
    case 'keywords':
      return articleDetail.keywords.length
        ? articleDetail.keywords.map(item => <span className={infoTextStyleName}>{item}</span>)
        : noDataItem
    case 'visit':
    case 'likes':
      return <span className={infoTextStyleName}>{articleDetail.meta[key]}</span>
    case 'comments':
      return (
        <div>
          <span className={infoTextStyleName}>{articleDetail.meta[key]}</span>
          <Link to={`/comment?article_id=${articleDetail._id}`}>
            <Button className={styles['view-comments-btn']}>查看评论</Button>
          </Link>
        </div>
      )
    case 'extends': 
      return articleDetail.extends.length ? articleDetail.extends.map(item => (
        <span className={infoTextStyleName}>{item.key + ':' + item.value}</span>
      )) : noDataItem
    default:
      return <span className={infoTextStyleName}>{articleDetail[key] || '---'}</span>
  }
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

export class ArticleDetail extends PureComponent {

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  state = {
    articleDetail: {}
  }

  componentWillMount () {
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
            <Affix offsetTop={64}>
              <Card title={<h4>基本信息</h4>} className={globalStyles['basic-info']}>
                {
                  articleDetail._id ? (
                    <Form>
                      {
                        formBasicOptions.map(item => (
                          <FormItem
                            key={item.key}
                            label={item.label}
                            {...formItemLayout}
                          >
                            {getBasicInfoItem(item.key, articleDetail)}
                          </FormItem>
                        ))
                      }
                    </Form>
                  ) : null
                }
              </Card>
            </Affix>
          </Col>
          <Col span={18}>
            <Card title={
              <h4 className={styles['content-title']}>Markdown内容
                <Link to={`/article/edit/${articleDetail._id}`}>
                  <Button type="primary" className={styles['go-edit-btn']}>去编辑</Button>
                </Link>
              </h4>}
            >
              <div data-view="markdown-body" dangerouslySetInnerHTML={{__html: articleDetail.rendered_content}} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ArticleDetail

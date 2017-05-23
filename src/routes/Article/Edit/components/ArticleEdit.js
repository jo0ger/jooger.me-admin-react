import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Row, Col, Form, Tag, Icon, Button, Input, Select, Spin } from 'antd'
import styles from '../assets/articleEdit'

const FormItem = Form.Item
const SelectOption = Select.Option

const formBasicOptions = [
  { key: 'state', label: '状态' },
  { key: 'title', label: '标题' },
  { key: 'excerpt', label: '摘要' },
  { key: 'category', label: '分类' },
  { key: 'tag', label: '标签' },
  { key: 'keywords', label: '关键词' },
  { key: 'thumbs', label: '缩略图' },
  { key: 'extends', label: '扩展项' }
]

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

export class ArticleEdit extends Component {
  static defaultProps = {
    match: PropTypes.object.isRequired,
    articleDetail: PropTypes.object.isRequired,
    defailtFetching: PropTypes.bool.isRequired,
    defailtSaving: PropTypes.bool.isRequired,
    fetchArticleDetail: PropTypes.func.isRequired,
    fetchCategoryList: PropTypes.func.isRequired,
    categoryList: PropTypes.array.isRequired,
    categoryFetching: PropTypes.bool.isRequired,
    categorySaving: PropTypes.bool.isRequired,
    fetchTagList: PropTypes.func.isRequired,
    tagList: PropTypes.array.isRequired,
    tagFetching: PropTypes.bool.isRequired,
    tagSaving: PropTypes.bool.isRequired
  }

  state = {
    articleModel: {},
    categoryFetched: false,
    tagFetched: false
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

  getBasicInfoItem (key = '', articleModel = {}) {
    switch (key) {
      case 'title':
        return <Input defaultValue={articleModel.title} placeholder="Article Title" />
      case 'excerpt':
        return <Input type="textarea" defaultValue={articleModel.excerpt} placeholder="Article Excerpt" style={{resize: 'none'}} autosize={{ minRows: 3, maxRows: 6 }} />
      case 'category':
        return (
          <Select
            placeholder="Select Category"
            value={articleModel.category ? articleModel.category.name : ''}
            onFocus={this.fetchCategoryList}
          >
            {
              this.props.categoryFetching
              ? (
                <SelectOption value="" disabled>
                  <Spin />
                </SelectOption>
              ) : this.props.categoryList.map(item => (
                <SelectOption value={item._id} key={item._id}>
                  {item.name}
                </SelectOption>
              ))
            }
          </Select>
        )
      case 'tag':
        return (
          <Select
            mode="tags"
            placeholder="Select Tags"
            value={articleModel.tag.length ? articleModel.tag.map(item => item.name) : []}
            onFocus={this.fetchTagList}
            onChange={this.handleTagSelectChange}
          >
            {
              this.props.tagFetching
              ? (
                <SelectOption value="" disabled>
                  <Spin />
                </SelectOption>
              ) : this.props.tagList.map(item => (
                <SelectOption value={item._id} key={item._id}>
                  {item.name}
                </SelectOption>
              ))
            }
          </Select>
        )
      case 'keywords':
      case 'thumbs':
      case 'extends':
      default:
        break
    }
  }

  fetchCategoryList = () => {
    if (this.state.categoryFetched) {
      return
    }
    this.props.fetchCategoryList().then(code => {
      // !code && (this.setState({
      //   categoryFetched: true
      // }))
    })
  }

  fetchTagList = () => {
    if (this.state.tagFetched) {
      return
    }
    this.props.fetchTagList().then(code => {
      // !code && (this.setState({
      //   tagFetched: true
      // }))
    })
  }

  handleTagSelectChange = () => {

  }

  render () {
    let { articleModel } = this.state
    return (
      <div className={styles['page-article-edit']}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title={<h4>Basic Info</h4>}>
              {
                articleModel._id ? (
                  <Form>
                    {
                      formBasicOptions.map(item => (
                        <FormItem
                          key={item.key}
                          label={item.label}
                          {...formItemLayout}
                        >
                          {this.getBasicInfoItem(item.key, articleModel)}
                        </FormItem>
                      ))
                    }
                  </Form>
                ) : null
              }
            </Card>
          </Col>
          <Col span={16}>
            <Card title={
              <h4 className={styles['content-title']}>Rendered Content
                <Link to={`/article/edit/${articleModel._id}`}>
                  <Button type="primary" className={styles['go-edit-btn']}>去编辑</Button>
                </Link>
              </h4>}
            >
              <div data-view="markdown-body" dangerouslySetInnerHTML={{__html: articleModel.rendered_content}} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}

export default ArticleEdit

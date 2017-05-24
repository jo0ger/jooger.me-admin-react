import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Affix, Row, Col, Form, Button, Input, Select, Spin, Radio, Icon } from 'antd'
import styles from '../assets/articleEdit'
import { classnames } from '~utils'
import globalStyles from '~styles/index'

const FormItem = Form.Item
const SelectOption = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const ButtonGroup = Button.Group
const InputGroup = Input.Group

const formBasicOptions = [
  { key: 'state', label: '状态' },
  { key: 'title', label: '标题' },
  { key: 'excerpt', label: '摘要' },
  { key: 'category', label: '分类' },
  { key: 'tag', label: '标签' },
  { key: 'keywords', label: '关键词' },
  { key: 'extends', label: '扩展项' },
  { key: 'thumbs', label: '缩略图' }
]

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 0 },
  },
}

let uuid = 0
export class ArticleEdit extends Component {
  static defaultProps = {
    form: PropTypes.object.isRequired,
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
  
  componentWillMount () {
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
      case 'state':

        return (
          <RadioGroup onChange={this.handleStateChange} value={articleModel.state}>
            <RadioButton className={classnames([styles['publish-state'], articleModel.state === 1 ? styles['state-checked'] : ''])} value={1}>直接发布</RadioButton>
            <RadioButton className={classnames([styles['draft-state'], articleModel.state === 0 ? styles['state-checked'] : ''])} value={0}>草稿箱</RadioButton>
            <RadioButton className={classnames([styles['delete-state'], articleModel.state === -1 ? styles['state-checked'] : ''])} value={-1}>回收站</RadioButton>
          </RadioGroup>
        )
      case 'title':
        return <Input value={articleModel.title} placeholder="Article Title" onChange={this.handleTitleInputChange} />
      case 'excerpt':
        return (
          <Input
            type="textarea"
            value={articleModel.excerpt}
            placeholder="Article Excerpt"
            style={{resize: 'none'}}
            autosize={{ minRows: 3, maxRows: 6 }}
             onChange={this.handleExcerptInputChange}
          />
        )
      case 'category':
        return (
          <Select
            placeholder="Select Category"
            value={articleModel.category ? articleModel.category.name : ''}
            onFocus={this.fetchCategoryList}
            onChange={this.handleCategorySelectChange}
          >
            {
              this.props.categoryFetching
              ? (
                <SelectOption value="" disabled>
                  <Spin />
                </SelectOption>
              ) : this.props.categoryList.map(item => (
                <SelectOption value={item.name} key={item.name}>
                  {item.name}
                </SelectOption>
              ))
            }
          </Select>
        )
      case 'tag':
        return (
          <Select
            mode="multiple"
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
                <SelectOption value={item.name} key={item.name}>
                  {item.name}
                </SelectOption>
              ))
            }
          </Select>
        )
      case 'keywords':
        return <Select mode="tags" placeholder="Input some keywords" onChange={this.handleKeywordsChange} tokenSeparators={[',']} />
      case 'thumbs':
        return
      case 'extends':
        const { getFieldDecorator, getFieldValue } = this.props.form
        getFieldDecorator('keys', { initialValue: [] })
        const keys = getFieldValue('keys')
        const formItems = keys.map((k, index) => {
          return (
            <div className={styles['extends-item']}>
              {getFieldDecorator(`names-${k}`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field.",
                }],
              })(
                <InputGroup>
                  <Col span="10">
                    <Input placeholder="key" />
                  </Col>
                  <Col span="11">
                    <Input placeholder="value" />
                  </Col>
                  <Col span="3">
                    <Icon
                      className={styles['extends-delete-btn']}
                      type="minus-circle-o"
                      disabled={keys.length === 1}
                      onClick={() => this.removeExtendItem(k)}
                    />
                  </Col>
                </InputGroup>
              )}
            </div>
          )
        })
        return (
          <FormItem>
            {formItems}
            <Button type="dashed" onClick={this.addExtendItem} style={{ width: '100%' }}>
              <Icon type="plus" /> Add field
            </Button>
          </FormItem>
        )
      default:
        break
    }
  }

  fetchCategoryList = () => {
    if (this.state.categoryFetched) {
      return
    }
    this.props.fetchCategoryList().then(code => {
      !code && (this.setState({
        categoryFetched: true
      }))
    })
  }

  fetchTagList = () => {
    if (this.state.tagFetched) {
      return
    }
    this.props.fetchTagList().then(code => {
      !code && (this.setState({
        tagFetched: true
      }))
    })
  }
  
  addExtendItem = () => {
    uuid++
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(uuid)
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  removeExtendItem = k => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  setArticleModel (key, value) {
    this.setState({
      articleModel: {
        ...this.state.articleModel,
        [key]: value
      }
    })
  }

  handleStateChange = e => {
    this.setArticleModel('state', e.target.value, 10)
  }

  handleTitleInputChange = e => {
    this.setArticleModel('title', e.target.value)
  }

  handleExcerptInputChange = e => {
    this.setArticleModel('excerpt', e.target.value)
  }

  handleCategorySelectChange = value => {
    this.setArticleModel('category', { name: value })
  }

  handleTagSelectChange = value => {
    this.setArticleModel('tag', value.map(item => ({ name: item })))
  }

  handleKeywordsChange = value => {
    this.setArticleModel('keywords', value)
  }

  handleSubmit = () => {}

  handleReset = () => {}

  render () {
    let { articleModel } = this.state
    return (
      <div className={styles['page-article-edit']}>
        <Row gutter={16}>
          <Col span={6}>
            <Affix offsetTop={64}>
              <div>
                <Card
                  className={globalStyles['basic-info']}
                  title={<h4 className={styles['info-title']}>基本信息</h4>}
                >
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
                <ButtonGroup className={styles['action-btns']}>
                  <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                  <Button onClick={this.handleReset}>重置</Button>
                </ButtonGroup>
              </div>
            </Affix>
          </Col>
          <Col span={18}>
            <Card title={<h4>Markdown内容</h4>}>
              <div data-view="markdown-body" dangerouslySetInnerHTML={{__html: articleModel.rendered_content}} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}

export default Form.create()(ArticleEdit)

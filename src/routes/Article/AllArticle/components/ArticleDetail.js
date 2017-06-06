import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Popover, Tag, Icon, Radio, Upload, Modal } from 'antd'
import NoData from '~components/NoData'
import MarkdownEditor from '~components/MarkdownEditor'
import Thumb from './Thumb'
import styles from '../assets/ArticleDetail'
import { fmtDate, classnames, qiniuRequest } from '~utils'

const FormItem = Form.Item
const CheckableTag = Tag.CheckableTag
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const defaultArticleModel = {
  title: '',
  content: '## 哈哈哈',
  excerpt: '',
  keywords: [],
  thumbs: [],
  state: 1,
  category: {},
  tag: [],
  meta: {
    visit: 0,
    likes: 0,
    comments: 0
  },
  extends: []
}

const defaultFormItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
}

const getArticleStatus = state => {
  switch (state) {
    case -1:
      return { color: '#f04134', text: '回收站' }
    case 0:
      return { color: '#ffce3d', text: '草稿箱' }
    case 1:
      return { color: '#00a854', text: '已发布' }
    default:
      return {}
  }
}

export class ArticleDetail extends Component {

  state = {
    articleModel: defaultArticleModel,
    editMode: false,
    keywordInputVisible: false,
    keywordInputValue: '',
    thumbPreviewVisible: false,
    thumbPreviewImage: ''
  }

  
  componentWillMount() {
    this.setArticleModel()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentArticle._id !== this.props.currentArticle._id) {
      this.setState({ editMode: false })
    }
    this.setArticleModel(nextProps)
  }

  componentWillUnmount () {}

  setArticleModel (props = this.props) {
    this.setState({
      articleModel: {
        ...defaultArticleModel,
        ...props.currentArticle
      }
    })
  }

  setArticleModelByKey (key, value) {
    this.setState({
      articleModel: {
        ...this.state.articleModel,
        [key]: value
      }
    })
  }

  handleTitleInputChange = e => this.setArticleModelByKey('title', e.target.value)

  handleExcerptInputChange = e => this.setArticleModelByKey('excerpt', e.target.value)

  handleKeywordsChange = value => this.setArticleModelByKey('keywords', value)

  handleEdit = () => this.setState({ editMode: true })

  handleCancle = () => {
    this.setArticleModel()
    this.setState({
      editMode: false,
    })
  }
  handleSave = () => {
    const { editArticleItem, currentArticle } = this.props
    const articleModel = { ...this.state.articleModel }
    articleModel.category = articleModel.category._id
    articleModel.tag = articleModel.tag.map(item => item._id)
    editArticleItem(articleModel, currentArticle._id)
  }

  handleStateChange = e => this.setArticleModelByKey('state', e.target.value)

  setKeywordInput = input => this._keywordInput = input

  handleShowKeywordInput = () => this.setState({ keywordInputVisible: true }, () => this._keywordInput.focus())

  handleKeywordInputChange = e => this.setState({ keywordInputValue: e.target.value })

  handleKeywordClose = value => e => {
    const { articleModel } = this.state
    let keywords = articleModel.keywords
    const index = keywords.indexOf(value)
    if (value && index > -1) {
      keywords.splice(index, 1)
      this.setArticleModelByKey('keywords', keywords)
    }
  }

  handleKeywordInputConfirm = () => {
    const { articleModel, keywordInputValue } = this.state
    let keywords = articleModel.keywords
    if (keywordInputValue && keywords.indexOf(keywordInputValue) === -1) {
      keywords = [...keywords, keywordInputValue]
      this.setArticleModelByKey('keywords', keywords)
    }
    this.setState({
      keywordInputVisible: false,
      keywordInputValue: ''
    })
  }

  setTagInput = input => this._tagInput = input

  handleShowtagInput = () => this.setState({ tagInputVisible: true }, () => this._tagInput.focus())

  handletagInputChange = e => this.setState({ tagInputValue: e.target.value })

  handleCategoryChange = value => checked => this.setArticleModelByKey('category', { _id: value })

  handleTagChange = value => checked => {
    const { articleModel } = this.state
    const _t = [...articleModel.tag]
    if (checked) {
      _t.push({ _id: value })
    } else {
      const index = articleModel.tag.findIndex(item => item._id === value)
      if (index > -1) {
        _t.splice(index, 1)
      }
    }
    this.setArticleModelByKey('tag', _t)
  }

  handleThumbChange = ({ file, fileList, event }) => {
    this.setArticleModelByKey('thumbs', fileList.map(({ uid, name, size, url, response }) => (
      {
        uid,
        name,
        size,
        url: response ? response.url : url
      }
    )))
  }

  handleThumbPreview = file => this.setState({
    thumbPreviewImage: file.url || file.thumbUrl,
    thumbPreviewVisible: true
  })

  handleThumbPreviewCancel = () => this.setState({ thumbPreviewVisible: false })

  metaRender () {
    const metas = [
      { key: '创建时间', value: 'create_at' },
      { key: '更新时间', value: 'update_at' },
      { key: '浏览数', value: 'visit', nest: true },
      { key: '喜欢数', value: 'likes', nest: true },
      { key: '评论数', value: 'comments', nest: true }
    ]
    const articleModel = this.state.articleModel
    return (
      <div className={styles.meta_info}>
        {
          metas.map(({ key, value, nest }) => {
            const root = nest ? articleModel.meta : articleModel
            const isTime = ['create_at', 'update_at'].includes(value)
            return (
              <div className={styles.meta_row} key={key}>
                <span className={styles.key}>{key}</span>
                <span className={styles.value}>{isTime ? fmtDate(root[value]) : root[value]}</span>
              </div>
            )
          })
        }
      </div>  
    )
  }

  formRender () {
    const { articleModel, editMode, keywordInputVisible, keywordInputValue, thumbPreviewVisible, thumbPreviewImage } = this.state
    const { categoryList, tagList } = this.props
    const statusModel = getArticleStatus(articleModel.state)
    return (
      <Form>
        <FormItem label="状态" {...defaultFormItemLayout}>
          {
            editMode
              ? (
                <RadioGroup onChange={this.handleStateChange} value={articleModel.state}>
                  <RadioButton className={classnames([styles.publish_state, articleModel.state === 1 ? styles.state_checked : ''])} value={1}>直接发布</RadioButton>
                  <RadioButton className={classnames([styles.draft_state, articleModel.state === 0 ? styles.state_checked : ''])} value={0}>草稿箱</RadioButton>
                  <RadioButton className={classnames([styles.delete_state, articleModel.state === -1 ? styles.state_checked : ''])} value={-1}>回收站</RadioButton>
                </RadioGroup>
                )
              : <Tag color={statusModel.color}>{statusModel.text}</Tag>
          }
        </FormItem>
        <FormItem label="分类" {...defaultFormItemLayout}>
          <div className={styles.category_wrap}>
            {
              editMode
                ? categoryList.map(item => (
                    <CheckableTag key={item._id} checked={item._id === (articleModel.category ? articleModel.category._id : null)} onChange={this.handleCategoryChange(item._id)}>
                      {item.name}
                    </CheckableTag>
                  ))
                : articleModel.category._id ? (
                  <Link to={`/article/category/${articleModel.category.name}`}>
                    <Tag>{articleModel.category.name}</Tag>
                  </Link>
                ) : '暂无分类'
            }
          </div>
        </FormItem>
        <FormItem label="标签" {...defaultFormItemLayout}>
          <div className={styles.tag_wrap}>
            {
              editMode
                ? tagList.map(item => (
                    <CheckableTag key={item._id} checked={articleModel.tag.find(t => t._id === item._id)} onChange={this.handleTagChange(item._id)}>
                      {item.name}
                    </CheckableTag>
                  ))
                : articleModel.tag.length ? articleModel.tag.map(item => (
                  <Link to={`/tag/${item.name}`} key={item._id}>
                    <Tag>{item.name}</Tag>
                  </Link>
                )) : '暂无标签'
            }
          </div>
        </FormItem>
        <FormItem label="关键词：" {...defaultFormItemLayout}>
          {
            articleModel.keywords.length
              ? articleModel.keywords.map(item => (
                  <Tag closable={editMode} key={item} onClose={this.handleKeywordClose(item)}>{item}</Tag>
                ))
              : editMode ? null : '暂无关键词'
          }
          {
            editMode ? (
              keywordInputVisible
                ? <Input
                    ref={this.setKeywordInput}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={keywordInputValue}
                    onChange={this.handleKeywordInputChange}
                    onBlur={this.handleKeywordInputConfirm}
                    onPressEnter={this.handleKeywordInputConfirm}
                  />
                : <Button size="small" type="dashed" onClick={this.handleShowKeywordInput}>+ 新关键词</Button>
            ) : null
          }
        </FormItem>
        <FormItem label="摘要：" {...defaultFormItemLayout}>
          {
            editMode
              ? <Input type="textarea" placeholder="请写下摘要" autosize={{ minRows: 3, maxRows: 6 }} style={{resize: 'none'}} value={articleModel.excerpt} onChange={this.handleExcerptInputChange} />
              : articleModel.excerpt ? <p>{articleModel.excerpt}</p> : '暂无摘要'
          }
        </FormItem>
        <FormItem label="缩略图" {...defaultFormItemLayout}>
          {
            !editMode
              ? (
                  articleModel.thumbs.length > 0
                    ? (
                        <div className="ant-upload-list ant-upload-list-picture-card">
                          {articleModel.thumbs.map(thumb => <Thumb key={thumb.url} thumb={thumb} onPreview={this.handleThumbPreview} />)}
                        </div>
                      )
                    : '暂无缩略图'
                )
              : (
                  <Upload
                    customRequest={
                      qiniuRequest({
                          name: 'jooger',
                          domain: 'http://oqtnezwt7.bkt.clouddn.com',
                          uploadUrl: 'http://up-z1.qiniu.com/',
                          uptoken: 'yvmsQiG7qdCesWCii3nMEMHK-8Ifi7EyRlcY1FmK:32NE450cE3nukeu9wA9Hw2taabQ=:eyJzY29wZSI6Impvb2dlciIsImRlYWRsaW5lIjoxNDk2NzcwMjg0fQ==',
                      })
                    }
                    listType="picture-card"
                    fileList={articleModel.thumbs}
                    onPreview={this.handleThumbPreview}
                    onChange={this.handleThumbChange}
                  >
                    {
                      articleModel.thumbs.length >= 3 
                      ? null
                      : <div>
                          <Icon type="plus" />
                          <div className="ant-upload-text">上传</div>
                        </div>
                    }
                  </Upload>
                )
          }
          
          <Modal visible={thumbPreviewVisible} footer={null} onCancel={this.handleThumbPreviewCancel}>
            <img alt="example" style={{ width: '100%' }} src={thumbPreviewImage} />
          </Modal>
        </FormItem>
      </Form>
    )
  }
  
  render () {
    const { articleModel, editMode } = this.state
    const { currentArticle, saving } = this.props

    return (
      <div className={styles.article_detail}>
        {
          articleModel._id
            ? (
              <div>
                <div className={styles.hd}>
                  <div className={styles.title}>
                    {
                      editMode
                        ? <input
                            type="text"
                            className={styles.title_input}
                            value={articleModel.title}
                            onChange={this.handleTitleInputChange}
                          />
                        : <span className={styles.title_text}>{articleModel.title}</span>
                    }
                  </div>
                  <div className={styles.actions}>
                    {
                      editMode
                        ? (
                            <div>
                              <Button className={styles.save_btn} icon="save" type="primary" loading={saving} onClick={this.handleSave}>保存</Button>
                              <Button className={styles.cancle_btn} onClick={this.handleCancle}>取消</Button>
                            </div>
                          )
                        : <Button className={styles.edit_btn} icon="edit" onClick={this.handleEdit}>编辑</Button>
                    }
                  </div>
                  <div className={styles.meta}>
                    <Popover content={this.metaRender()} placement="bottomLeft">
                      <Button className={styles.meta_btn} type="dashed" shape="circle" icon="info-circle-o" title="文章其他信息" />
                    </Popover>
                  </div>
                  <div className={styles.comment}>
                    <Button className={styles.comment_btn} type="dashed" shape="circle" icon="message" title="评论" />
                  </div>
                </div>
                <div className={styles.bd}>
                  <div className={styles.info}>
                    {this.formRender()}
                  </div>
                  <div
                    className={classnames({
                      [styles.content]: true,
                      [styles.edit_mode]: editMode
                    })}
                  >
                    {
                      editMode
                        ? <MarkdownEditor />
                        : <div
                            className={classnames([styles.article_content, 'markdown_body'])}
                            dangerouslySetInnerHTML={{__html: currentArticle.rendered_content}}
                          />
                    }
                  </div>
                </div>
              </div>
            )
          : <NoData text="未选择文章，请在左侧列表中选择" />
        }
      </div> 
    )
  }
}

ArticleDetail.propTypes = {
  currentArticle: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  categoryList: PropTypes.array.isRequired,
  categoryFetching: PropTypes.bool.isRequired,
  tagList: PropTypes.array.isRequired,
  tagFetching: PropTypes.bool.isRequired,
  editArticleItem: PropTypes.func.isRequired
}

export default ArticleDetail

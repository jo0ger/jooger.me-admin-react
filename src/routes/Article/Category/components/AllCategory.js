import React from 'react'
import PropTypes from 'prop-types'
import { Tag, Button, Modal, Form, Input} from 'antd'
import BaseComponent from '~components/BaseComponent'
import Page from '~components/Page'
import ListFilter from '~components/ListFilter'
import Extends from '~components/Extends'
import { findExtendsItemValue } from '~utils'
import styles from '../assets/AllCategory'

const FormItem = Form.Item

const defaultFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

export class AllCategory extends BaseComponent {

  state = {
    searchText: '',
    showList: [],
    showModal: false,
    model: {
      name: '',
      description: '',
      extends: []
    }
  }

  componentWillMount () {
    this.init()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ showList: nextProps.categoryList })
  }

  init () {
    const { categoryList } = this.props
    if (!categoryList.length) {
      this.props.fetchCategoryList().then(code => {
        if (!code) {
          this.setState({ showList: this.props.categoryList })
        }
      })
    } else {
      this.setState({ showList: categoryList })
    }
  }

  setModelByKey (key, value, cb) {
    this.setState({
      model: {
        ...this.state.model,
        [key]: value
      }
    }, () => cb && cb())
  }

  handleSearch = val => {
    if (val === this.state.searchText && !!val) {
      return
    }
    this.setState({ earchText: val })
    this.setState({
      showList: this.props.categoryList.filter(item => item.name.includes(val))
    })
  }

  handleOpenModal = e => {
    this.setState({
      showModal: true
    })
  }

  handleConfirmCreateCategory = e => {
    this.props.createCategoryItem(this.state.model).then(code => {
      if (!code) {
        this.setState({
          model: {
            name: '',
            description: '',
            extends: []
          }
        })
      }
      this.setState({
        showModal: false
      })
    })
  }

  handleCancel = e => {
    this.setState({
      showModal: false
    })
  }

  handleNameInputChange = e => this.setModelByKey('name', e.target.value)

  handleDescInputChange = e => this.setModelByKey('description', e.target.value)

  handleExtendsChange = extendsModel => {
    this.setModelByKey('extends', extendsModel)
  }

  handleDeleteCategory = (id, index) => e => {
    // TODO 这里没有办法阻止tag消失，forceUpdate也不行，计划用其他方式代替Tag
    this.props.deleteCategoryItem(id, index)
  } 

  formRender () {
    const { model } = this.state
    return (
      <Form>
        <FormItem label="名称" {...defaultFormItemLayout}>
          <Input type="text" placeholder="请填写名称" value={model.name} onChange={this.handleNameInputChange} style={{width: 200}} />
        </FormItem>
        <FormItem label="简介" {...defaultFormItemLayout}>
          <Input type="textarea" placeholder="请写下简介" autosize={{ minRows: 3, maxRows: 6 }} style={{resize: 'none'}} value={model.description} onChange={this.handleDescInputChange} />
        </FormItem>
        <FormItem label="扩展项" {...defaultFormItemLayout}>
          <Extends
            extendsModel={model.extends}
            onChange={this.handleExtendsChange}
          />
        </FormItem>
      </Form>
    )
  }
  
  render () {
    const { showList, showModal } = this.state
    return (
      <Page customClassName={styles.page_category}>
        <div className={styles.list_view}>
          <ListFilter
            onMenuClick={this.handleSorterMenuClick}
            onSearch={this.handleSearch}
          />
          <div className={styles.category_list}>
            {
              showList.map((item, index) => (
                <Tag
                  key={item._id}
                  className={styles.category_item}
                  color={findExtendsItemValue(item.extends, 'color')}
                  closable
                  onClose={this.handleDeleteCategory(item._id, index)}
                >
                  {item.name}
                </Tag>
              ))
            }
            <Button className={styles.create_btn} icon="plus" size="small" onClick={this.handleOpenModal} />
            <Modal
              title="新建分类"
              visible={showModal}
              onOk={this.handleConfirmCreateCategory}
              onCancel={this.handleCancel}
            >
              {this.formRender()}
            </Modal>
          </div>
        </div>
        <div className={styles.detail_view}></div>
      </Page>
    )
  }
}

AllCategory.propTypes = {
  fetching: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  creating: PropTypes.bool.isRequired,
  categoryList: PropTypes.array.isRequired,
  fetchCategoryList: PropTypes.func.isRequired,
  createCategoryItem: PropTypes.func.isRequired,
  deleteCategoryItem: PropTypes.func.isRequired
}

export default AllCategory

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Popconfirm, Button, Table, Tag, Badge, message } from 'antd'
import DropOption from '~components/DropOption'

const getActionBtn = function (text, record, index, onOperate = null) {

  let { state } = record
  let allMenuOptions = [
    { key: 'publish', name: '发布文章' },
    { key: 'moveDraft', name: '移草稿箱' },
    { key: 'moveRecycle', name: '移回收站' }
  ]
  let menuKey = []
  switch (state) {
    case -1:
      menuKey = [0, 1]
      break;
    case 0:
      menuKey = [0, 2]
      break;
    case 1:
      menuKey = [1, 2]
      break;
    default:
      break;
  }

  return (
    <div>
      <DropOption
        menuOptions={menuKey.map(key => allMenuOptions[key])}
        buttonStyle={{ border: 'solid 1px #eee', width: 60 }}
        onMenuClick={({ key }) => {
          onOperate && onOperate(record._id, index, key)
        }}
      />
      <Button type="primary" onClick={() => onOperate && onOperate(record._id, index, 'edit')}>编辑</Button>
      <Popconfirm placement="top"
        title="这会完全删除这篇文章，是否继续？"
        onConfirm={() => onOperate && onOperate(record._id, index, 'delete')}
        okText="是"
        cancelText="否">
        <Button type="danger">删除</Button>
      </Popconfirm>
    </div>
  )
}


const getColumn = (onOperate) => {
  return [{
    title: '标题',
    dataIndex: 'title',
    render: title => <h4>{ title }</h4>
  }, {
    title: '分类',
    dataIndex: 'category',
    render: ({ name, color }) => (
      <Tag color={color || 'blue'}>{ name }</Tag>
    )
  }, {
    title: '标签',
    dataIndex: 'tag',
    render: list => {
      return (
        list.map(({ name, ...rest }, index) => {
          let extend = rest.extends
          let colorItem = extend.find(item => item.key === 'color')
          return (
            <Tag color={colorItem && colorItem.value || 'blue'} key={name}>{ name }</Tag>
          )
        })
      )
    }
  }, {
    title: '状态',
    dataIndex: 'state',
    filters: [
      { text: 'Published', value: 1 },
      { text: 'Draft', value: 0 },
      { text: 'Deleted', value: -1 }
    ],
    filterMultiple: false,
    filtered: true,
    // onFilter: (value, record) => record.state === value,
    render: state => {
      const status = state === 1 ? 'success' : (
        state === 0 ? 'warning' : 'error'
      )
      const text = state === 1 ? 'Published' : (
        state === 0 ? 'Draft' : 'Deleted'
      )
      return <Badge status={status} text={text} />
    }
  }, {
    title: '操作',
    key: 'action',
    render: (text, record, index) => {
      return getActionBtn(text, record, index, onOperate)
    }
  }]
}


class ArticleList extends Component {

  static propTypes = {
    articleList: PropTypes.array,
    pagination: PropTypes.object,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onOperate: PropTypes.func,
    onChange: PropTypes.func
  }
  
  static defaultProps = {
    articleList: [],
    pagination: {},
    loading: false,
    onSelect: function () {},
    onSelectAll: function () {},
    onOperate: function () {},
    onChange: function () {}
  }

  render () {

    const { pagination, articleList, onChange, onOperate, onSelect, onSelectAll, loading } = this.props
    const { total, current_page, per_page, total_page } = pagination
    const rowSelection = { onSelect, onSelectAll }

    let computedList = articleList.map(item => {
      return {
        ...item,
        key: item._id,
        onEdit: id => {

        }
      }
    })

    let computedPagination = {
      current: current_page,
      total,
      pageSize: per_page
    }

    const columns = getColumn(onOperate)

    return (
      <div className="article-list">
        <Table loading={loading}
          dataSource={computedList}
          columns={columns}
          onChange={onChange}
          rowSelection={rowSelection}
          pagination={computedPagination} />
      </div>
    )
  }

}

export default ArticleList

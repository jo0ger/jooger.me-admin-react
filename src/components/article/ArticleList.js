import React from 'react'
import { Table, Tag, Badge } from 'antd'

const columns = [{
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
      list.map(({ name, color }, index) => (
        <Tag color={color || 'blue'} key={name}>{ name }</Tag>
      ))
    )
  }
}, {
  title: '状态',
  dataIndex: 'state',
  render: state => {
    const status = state === 1 ? 'success' : (
      state === 0 ? 'warning' : 'error'
    )
    const text = state === 1 ? 'Published' : (
      state === 0 ? 'Draft' : 'Deleted'
    )
    return <Badge status={status} text={text} />
  }
}]

const ArticleList = ({
  articleList = [],
  pagination = {},
  onPageChange,
  select,
  selectAll,
  loading
}) => {

  let computedList = articleList.map(item => {
    return { ...item, key: item._id }
  })

  const { total, current_page, per_page, total_page } = pagination
  const rowSelection = {
    onSelect: select,
    onSelectAll: selectAll
  }

  let computedPagination = {
    current: current_page,
    total,
    pageSize: per_page,
    onChange: onPageChange
  }

  return (
    <Table
      dataSource={computedList}
      columns={columns}
      onChange={onchange}
      rowSelection={rowSelection}
      pagination={computedPagination} />
  )
}

export default ArticleList

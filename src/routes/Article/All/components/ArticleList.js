import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Popconfirm, Button, Table, Tag, Badge } from 'antd'
import DropOption from '~components/DropOption'
import { fmtDate } from '~utils'
import styles from '../assets/allArticle'

const getActionBtn = (text, record, index, onOperate = null) => {
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
    <div className={styles['list-actions']}>
      <DropOption
        menuOptions={menuKey.map(key => allMenuOptions[key])}
        buttonStyle={{ border: 'solid 1px #eee', width: 60 }}
        onMenuClick={({ key }) => {
          onOperate && onOperate(record._id, index, key)
        }}
      />
      <Button type="primary" onClick={() => onOperate && onOperate(record._id, index, 'edit')}>编辑</Button>
      <Popconfirm
        placement="top"
        title="这会完全删除这篇文章，是否继续？"
        onConfirm={() => onOperate && onOperate(record._id, index, 'delete')}
        okText="是"
        cancelText="否"
      >
        <Button type="danger">删除</Button>
      </Popconfirm>
    </div>
  )
}

const getComputedList = (articleList = []) => articleList.map(item => ({
  ...item,
  key: item._id
}))

const getListColumn = (filter, sorter, onOperate) => ([
  {
    title: '日期',
    dataIndex: 'create_at',
    width: 150,
    render: date => <span>{ fmtDate(date) }</span>  
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 350,
    render: title => <h4>{ title }</h4>
  },
  {
    title: '分类',
    dataIndex: 'category',
    width: 150,
    render: ({ name, color }) => (
      <Link to={`/article/category/${name}`}>
        <Tag color={color || 'blue'}>{ name }</Tag>
      </Link>
    )
  },
  {
    title: '标签',
    dataIndex: 'tag',
    render: list => {
      return (
        list.map(({ name, ...rest }, index) => {
          let extend = rest.extends
          let colorItem = extend.find(item => item.key === 'color')
          return (
            <Link to={`/article/category/${name}`} key={rest._id}>
              <Tag color={colorItem ? colorItem.value : 'blue'}>{ name }</Tag>
            </Link>
          )
        })
      )
    }
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: [
      { text: <Badge status="success" text="Published" />, value: 1 },
      { text: <Badge status="warning" text="Drafted" />, value: 0 },
      { text: <Badge status="error" text="Deleted" />, value: -1 }
    ],
    filterMultiple: false,
    filtered: true,
    filteredValue: filter.state,
    width: 150,
    render: state => {
      const [status, text] = state === 1
        ? ['success', 'Published']
        : (
          state === 0 ? ['warning', 'Drafted'] : ['error', 'Deleted']
        )
      return <Badge status={status} text={text} />
    }
  },
  {
    title: 'PV',
    dataIndex: 'meta.visit',
    sorter: true,
    sortOrder: sorter.columnKey === 'meta.visit' ? sorter.order : false,
    render: count => count
  },
  {
    title: '赞数',
    dataIndex: 'meta.likes',
    sorter: true,
    sortOrder: sorter.columnKey === 'meta.likes' ? sorter.order : false,
    render: count => count
  },
  {
    title: '评论',
    dataIndex: 'meta.comments',
    sorter: true,
    sortOrder: sorter.columnKey === 'meta.comments' ? sorter.order : false,
    render: count => count
  },
  {
    title: '操作',
    key: 'action',
    width: 250,
    className: styles['action-column'],
    render: (text, record, index) => {
      return getActionBtn(text, record, index, onOperate)
    }
  }
])

export const ArticleList = (props) => {
  const { articleList, pagination, filter, sorter, listFetching, listEditing, onChange, onOperate, onSelect, onSelectAll } = props
  const { total, current_page, per_page } = pagination
  
  const computedPagination = {
    current: current_page,
    total,
    pageSize: per_page
  }

  return (
    <div className={styles['article-list']}>
      <Table
        loading={listFetching || listEditing}
        dataSource={getComputedList(articleList)}
        columns={getListColumn(filter, sorter, onOperate)}
        pagination={computedPagination}
        onChange={onChange}
        rowSelection={{ onSelect, onSelectAll }}
      />
    </div>
  )
}

ArticleList.propTypes = {
  listFetching: PropTypes.bool.isRequired,
  listEditing: PropTypes.bool.isRequired,
  articleList: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  sorter: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onOperate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired
}

export default ArticleList

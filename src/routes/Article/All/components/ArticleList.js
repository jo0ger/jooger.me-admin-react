import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Popconfirm, Button, Table, Tag, Badge, Input, Icon } from 'antd'
import DropOption from '~components/DropOption'
import { fmtDate } from '~utils'
import styles from '../assets/allArticle'

const Search = Input.Search

// 获取表格每行操作栏的action button
const getActionBtn = (text, record, index, onOperate = function () {}) => {
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
        menuText="动作"
        menuOptions={menuKey.map(key => allMenuOptions[key])}
        buttonStyle={{ border: 'solid 1px #eee' }}
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

// 根据需要重新组织ArticleList用于table显示
const getComputedList = (articleList = []) => articleList.map(item => ({
  ...item,
  key: item._id
}))

// 获取列集合
const getListColumn = ctx => {
  const {
    props: { filter, sorter },
    state: { model: { category, tag } },
    handleFilterDropdownVisibleChange,
    handleFilterSearchInputChange,
    handleFilterInputSearch
  } = ctx
  const onOperate = ctx.handleTableOperate
  const onCategorySearch = () => handleFilterInputSearch('category')
  const onTagSearch = () => handleFilterInputSearch('tag')

  return ([
    {
      title: '日期',
      dataIndex: 'create_at',
      key: 'create_at',
      width: 150,
      render: date => <span>{ fmtDate(date) }</span>
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 350,
      render: (title, record) => (
        <Link to={`/article/detail/${record._id}`}>
          <h4>{ title }</h4>
        </Link>
      )
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => ctx.categorySearchInput = ele}
            placeholder="搜索分类"
            value={category.query}
            onChange={e => handleFilterSearchInputChange(e.target.value, 'category')}
            onPressEnter={onCategorySearch}
          />
          <Button type="primary" style={{marginRight: '5px'}} onClick={onCategorySearch} >搜索</Button>
          <Button onClick={() => handleFilterSearchInputChange('', 'category')}>重置</Button>
        </div>
      ),
      filtered: true,
      filterDropdownVisible: category.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => handleFilterDropdownVisibleChange(visible, 'category'),
      filterIcon: <Icon type="search" style={{ color: !!category.query ? '#108ee9' : '#aaa' }} />,
      render: (text) => {
        if (!text) {
          return null
        }
        const { name, color } = text
        return (
          <Link to={`/article/category/${name}`}>
            <Tag color={color || 'blue'}>{ name }</Tag>
          </Link>
        )
      }
    },
    {
      title: '标签',
      dataIndex: 'tag',
      key: 'tag',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => ctx.tagSearchInput = ele}
            placeholder="搜索标签"
            value={tag.query}
            onChange={e => handleFilterSearchInputChange(e.target.value, 'tag')}
            onPressEnter={onTagSearch}
          />
          <Button type="primary" style={{marginRight: '5px'}} onClick={onTagSearch} >搜索</Button>
          <Button onClick={() => handleFilterSearchInputChange('', 'tag')}>重置</Button>
        </div>
      ),
      filtered: true,
      filterDropdownVisible: tag.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => handleFilterDropdownVisibleChange(visible, 'tag'),
      filterIcon: <Icon type="search" style={{ color: !!tag.query ? '#108ee9' : '#aaa' }} />,
      render: list => {
        return (
          list.length ? list.map(({ name, ...rest }, index) => {
            let extend = rest.extends
            let colorItem = extend.find(item => item.key === 'color')
            return (
              <Link to={`/article/tag/${name}`} key={rest._id}>
                <Tag color={colorItem ? colorItem.value : 'blue'}>{ name }</Tag>
              </Link>
            )
          }) : null
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      filters: [
        { text: <Badge status="success" text="Published" />, value: 1 },
        { text: <Badge status="warning" text="Drafted" />, value: 0 },
        { text: <Badge status="error" text="Deleted" />, value: -1 }
      ],
      filterMultiple: false,
      filtered: true,
      filteredValue: filter.state || [],
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
      key: 'meta.visit',
      width: 100,
      sorter: true,
      sortOrder: sorter.columnKey === 'meta.visit' ? sorter.order : false,
      render: count => count
    },
    {
      title: '赞数',
      dataIndex: 'meta.likes',
      key: 'meta.likes',
      width: 100,
      sorter: true,
      sortOrder: sorter.columnKey === 'meta.likes' ? sorter.order : false,
      render: count => count
    },
    {
      title: '评论',
      dataIndex: 'meta.comments',
      key: 'meta.comments',
      width: 100,
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
}

// 根据filter和sorter获取部分请求params（主要是state和sort字段）
const getParamsByFilterAndSorter = (filter = {}, sorter = {}) => {
  const { state } = filter
  const params = {}
  if (state && state.length) {
    params.state = state[0]
  }
  if (sorter && sorter.field) {
    params.sort = { [sorter.field]: sorter.order === 'descend' ? -1 : 1 }
  }
  return params
}

// 根据input model 获取部分请求params（主要是category和tag字段）
const getParamsByModel = (model = []) => {
  const params = []
  Object.keys(model).forEach(key => {
    const query = model[key].query
    if (query) {
      params[key] = query
    }
  })
  return params
}

// 获取文章摘要折叠行
const NO_EXCERPT = '--'
const getExcerptRow = row => <p><strong>摘要：&nbsp;&nbsp;</strong>{ row.excerpt || NO_EXCERPT }</p>

// 获取分页总条目数
const getPaginationTotal = (total, range) => `共 ${total} 篇文章，当前 ${range[0]}-${range[1]} `

// 获取Table的Title
const batchMenuOptions = (noSelected) => [
  { key: 'batchPublish', name: '批量发布', props: { disabled: noSelected } },
  { key: 'batchDraft', name: '批量草稿', props: { disabled: noSelected } },
  { key: 'batchRecycle', name: '批量回收', props: { disabled: noSelected } }
]

const noop = function () {}

const getTableTitle = ({
  currentPageData,
  selectedList = [],
  onOperate = noop,
  onSearch = noop,
  onInputChange = noop,
  searchKeyword = '',
  deleting,
  editing,
  refreshing,
  onRefresh = noop
}) => {
  const noSelected = selectedList.length < 1
  return (
    <div className={styles['list-title']}>
      <div className={styles['title-actions']}>
        <DropOption
          menuText="批量修改"
          menuOptions={batchMenuOptions(noSelected)}
          buttonStyle={{ border: 'solid 1px #eee' }}
          dropdownProps={{
            disabled: noSelected
          }}
          onMenuClick={({ key }) => onOperate(key)}
        />
        <Popconfirm
          placement="right"
          title="这会完全删除这些文章，是否继续？"
          onConfirm={() => onOperate('batchDelete')}
          okText="是"
          cancelText="否"
        >
          <Button type="danger" icon="delete" loading={deleting} disabled={noSelected}>批量删除</Button>
        </Popconfirm>
        <Button type="primary" icon="reload" loading={refreshing} onClick={onRefresh}>刷新</Button>
      </div>
      <div className={styles['title-search']}>
        <Search
          placeholder="搜索标题或者摘要"
          value={searchKeyword}
          style={{ width: 200 }}
          onChange={e => onInputChange(e.target.value)}
          onSearch={value => onSearch(value.trim())}
        />
      </div>
    </div>
  )
}

export class ArticleList extends PureComponent {

  state = {
    model: {
      category: {
        query: '',
        filterDropdownVisible: false
      },
      tag: {
        query: '',
        filterDropdownVisible: false
      }
    },
    selectedList: [],                    // 批量选中的文章ID
    searchKeyword: '',
    refreshing: false
  }

  // 编辑文章状态（单篇 || 批量）
  _editArticleState (ids, indexes, state = 0) {
    this.props.editArticle({
      article_ids: ids,
      indexes,
      state
    })
  }

  // 删除文章 （单篇 || 批量）
  _deleteArticle (ids, indexes) {
    this.props.deleteArticle({
      article_ids: ids,
      indexes
    }).then(code => {
      if (!code) {
        // 删除后再根据当前的所有条件再查询一遍
        const { fetchArticleList, pagination, filter, sorter } = this.props
        const params = {
          page: pagination.current_page,
          ...getParamsByModel(this.state.model),
          ...getParamsByFilterAndSorter(filter, sorter)
        }
        fetchArticleList(params, filter, sorter)
      }
    })
  }

  _clearState () {
    this.setState({
      model: {
        category: {
          query: '',
          filterDropdownVisible: false
        },
        tag: {
          query: '',
          filterDropdownVisible: false
        }
      },
      selectedList: [],
      searchKeyword: '',
      refreshing: false
    })
  }

  // 过滤搜索的input change事件处理
  handleFilterSearchInputChange = (query = '', type) => {
    this.setState({
      model: {
        ...this.state.model,
        [type]: {
          ...this.state.model[type],
          query
        }
      }
    })
  }

  // table搜索过滤
  handleFilterInputSearch = type => {
    const { filter, sorter } = this.props
    const params = {
      page: 1,
      ...getParamsByModel(this.state.model),
      ...getParamsByFilterAndSorter(filter, sorter)
    }
    this.props.fetchArticleList(params, filter, sorter)
  }

  // 控制搜索过滤的dropmenu显示和隐藏
  handleFilterDropdownVisibleChange = (visible, type) => {
    this.setState({
      model: {
        ...this.state.model,
        [type]: {
          ...this.state.model[type],
          filterDropdownVisible: visible
        }
      }
    }, () => {
      this[`${type}SearchInput`].focus()
    })
  }

  // filter和sorter变化
  handleTableChange = (pagination, filters, sorter) => {
    const params = getParamsByFilterAndSorter(filters, sorter)
    params.page = pagination.current
    this.props.fetchArticleList(params, filters, sorter)
  }

  // 文章操作
  handleTableOperate = (id, index, type) => {
    switch (type) {
      case 'edit':
        this.props.history.push(`/article/edit/${id}`)
        break;
      case 'publish':
        this._editArticleState([id], [index], 1)
        break
      case 'moveDraft':
        this._editArticleState([id], [index], 0)
        break
      case 'moveRecycle':
        this._editArticleState([id], [index], -1)
        break
      case 'delete':
        this._deleteArticle([id], [index])
        break
      default:
        break;
    }
  }

  handleBatchOperate = type => {
    const indexes = this.state.selectedList.map(id => {
      return this.props.articleList.findIndex(item => item._id === id)
    })
    const ids = [...this.state.selectedList]
    switch (type) {
      case 'batchPublish':
        this._editArticleState(ids, indexes, 1)
        break
      case 'batchDraft':
        this._editArticleState(ids, indexes, 0)
        break
      case 'batchRecycle':
        this._editArticleState(ids, indexes, -1)
        break
      case 'batchDelete':
        this._deleteArticle(ids, indexes)
        break
      default:
        break
    }
  }

  // 行选择
  handleTableSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedList: selectedRowKeys })
  }

  handleSearchInputChange = value => {
    this.setState({
      searchKeyword: value
    })
  }

  // 处理Title上的搜索
  handleInputSearch = value => {
    // 清空所有搜索信息
    this._clearState()
    this.setState({
      searchKeyword: value
    })
    const params = { page: 1 }
    if (value) {
      params.keyword = value
    }
    this.props.fetchArticleList(params)
  }

  handleRefresh = () => {
    this._clearState()
    this.setState({
      refreshing: true
    })
    this.props.fetchArticleList({ page: 1 }).then(code => {
      this.setState({
        refreshing: false
      })
    })
  }

  render () {
    const { selectedList, refreshing, searchKeyword } = this.state
    const { articleList, pagination, listFetching, listEditing, listDeleting } = this.props
    const { total, current_page, per_page } = pagination
    
    const computedPagination = {
      current: current_page,
      total,
      pageSize: per_page,
      showTotal: getPaginationTotal
    }

    const rowSelection = {
      onChange: this.handleTableSelectChange
    }

    return (
      <div className={styles['article-list']}>
        <Table
          selectedRowKeys={[1,2,3,4,5,6,7,8,9,10]}
          title={(currentPageData) => getTableTitle({
            currentPageData,
            selectedList: selectedList,
            onOperate: this.handleBatchOperate,
            onSearch: this.handleInputSearch,
            searchKeyword: searchKeyword,
            onInputChange: this.handleSearchInputChange,
            refreshing: refreshing,
            editing: listEditing,
            deleting: listDeleting,
            onRefresh: this.handleRefresh
          })}
          loading={listFetching || listEditing || listDeleting}
          dataSource={getComputedList(articleList)}
          columns={getListColumn(this)}
          pagination={computedPagination}
          onChange={this.handleTableChange}
          rowSelection={rowSelection}
          expandedRowRender={getExcerptRow}
        />
      </div>
    )
  }

}

ArticleList.propTypes = {
  listFetching: PropTypes.bool.isRequired,      // 文章请求状态
  listEditing: PropTypes.bool.isRequired,       // 文章编辑状态
  listDeleting: PropTypes.bool.isRequired,      // 文章删除状态
  articleList: PropTypes.array.isRequired,      // 文章列表
  pagination: PropTypes.object.isRequired,      // 分页信息,
  filter: PropTypes.object.isRequired,          // 文章过滤,
  sorter: PropTypes.object.isRequired,          // 文章排序
  fetchArticleList: PropTypes.func.isRequired,  // 文章获取方法
  editArticle: PropTypes.func.isRequired,       // 文章修改状态方法
  deleteArticle: PropTypes.func.isRequired      // 文章删除方法
}

export default ArticleList

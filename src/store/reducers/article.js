// 文章列表

import Service from '~service'

// ------------------------------------
// Article List 请求
// ------------------------------------
const FETCH_ARTICLE_LIST_REQUEST = 'FETCH_ARTICLE_LIST_REQUEST'
const FETCH_ARTICLE_LIST_SUCCESS = 'FETCH_ARTICLE_LIST_SUCCESS'
const FETCH_ARTICLE_LIST_FAILURE = 'FETCH_ARTICLE_LIST_FAILURE'

// list请求开始
export const requestList = () => ({
  type: FETCH_ARTICLE_LIST_REQUEST
})

// list请求成功
export const requestListSuccess = (data, filter, sorter, refresh) => ({
  type: FETCH_ARTICLE_LIST_SUCCESS,
  payload: { ...data, filter, sorter, refresh }
})

// list请求失败
export const requestListFailure = err => ({
  type: FETCH_ARTICLE_LIST_FAILURE,
  payload: err
})

// 请求
// refresh 是否刷新列表 default: false
export const fetchArticleList = (params = {}, filter = {}, sorter = {}, refresh = true) => (dispatch, getState) => {
  if (getState().article.fetching) {
    // TODO 提示 请勿频繁操作？？？
    return
  }
  // 请求开始
  dispatch(requestList())
  return Service.article.getList({ params }).then(({ code, data }) => {
    if (!code) {
      // 请求成功
      dispatch(requestListSuccess(data, filter, sorter, refresh))
    }
    return code
  }).catch(err => {
    // 请求失败
    dispatch(requestListFailure(err))
    return err
  })
}

// ------------------------------------
// Article Item 编辑
// ------------------------------------
const EDIT_ARTICLE_ITEM_REQUEST = 'EDIT_ARTICLE_ITEM_REQUEST'
const EDIT_ARTICLE_ITEM_SUCCESS = 'EDIT_ARTICLE_ITEM_SUCCESS'
const EDIT_ARTICLE_ITEM_FAILURE = 'EDIT_ARTICLE_ITEM_FAILURE'

// TODO

// ------------------------------------
// Article Item 删除
// ------------------------------------
const DELETE_ARTICLE_ITEM_REQUEST = 'DELETE_ARTICLE_ITEM_REQUEST'
const DELETE_ARTICLE_ITEM_SUCCESS = 'DELETE_ARTICLE_ITEM_SUCCESS'
const DELETE_ARTICLE_ITEM_FAILURE = 'DELETE_ARTICLE_ITEM_FAILURE'

export const deleteArticleRequest = () => ({
  type: DELETE_ARTICLE_ITEM_REQUEST
})

export const deleteArticleFailure = err => ({
  type: DELETE_ARTICLE_ITEM_FAILURE,
  payload: err
})

export const deleteArticleSuccess = ({index}) => ({
  type: DELETE_ARTICLE_ITEM_SUCCESS,
  payload: index
})

// 包含 1. 单篇删除   2. 批量删除
// 但是目前只用到了2，因为其实就是将单篇的id包装成一个数组而已
// 目前未找到用1的场景，但这里先写下了
export const deleteArticleItem = (params = {}, id, index) => (dispatch, getState) => {
  if (getState().article.deleting) {
    return
  }
  dispatch(deleteArticleRequest())
  const { article_ids } = params
  if (article_ids) {
    // 批量删除
    const { indexes } = params
    return Service.article.batchDelete({ data: {article_ids} }).then(({code}) => {
      if (!code) {
        dispatch(deleteArticleSuccess({
          indexes,
          isBatch: true
        }))
      }
      return code
    }).catch(err => dispatch(deleteArticleFailure(err)))
  }
  // 单篇文章删除
  return Service.article.deleteItem(id)(params).then(code => {
    if (!code) {
      dispatch(deleteArticleSuccess({ index }))
    }
    return code
  }).catch(err => dispatch(deleteArticleFailure(err)))
}

// ------------------------------------
// ACTION HANDLERS
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ARTICLE_LIST_REQUEST]: state => ({
    ...state,
    fetching: true
  }),
  [FETCH_ARTICLE_LIST_SUCCESS]: (state, { list, pagination, filter, sorter, refresh }) => {
    return {
      ...state,
      fetching: false,
      list: refresh ? list : [...state.list, ...list],
      pagination,
      filter,
      sorter
    }
  },
  [FETCH_ARTICLE_LIST_FAILURE]: (state, err) => ({
    ...state,
    fetching: false
  }),
  [DELETE_ARTICLE_ITEM_REQUEST]: state => ({
    ...state,
    deleting: true
  }),
  [DELETE_ARTICLE_ITEM_FAILURE]: state => ({
    ...state,
    deleting: false
  }),
  [DELETE_ARTICLE_ITEM_SUCCESS]: (state, index) => {
    let articleList = [...state.list]
    // 单篇内容修改
    articleList.splice(index, 1)
    return {
      ...state,
      deleting: false,
      list: articleList
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,    // 列表获取状态
  saving: false,      // 列表保存状态
  deleting: false,    // 列表删除状态
  list: [],           // 列表LIST
  pagination: {},     // 列表分页信息
  filter: {},         // 列表过滤信息
  sorter: {}          // 列表排序信息
}
export default function articleListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action.payload) : state
}
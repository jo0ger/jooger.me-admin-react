// 文章列表

import Service from '~service'
import { message } from 'antd'
import { isType } from '~utils'

// 现在是否有任务在进行
const isProcessCarryOut = ({ article: { fetching, saving, deleting } }) => {
  const isProcessing = fetching || saving || deleting
  return isProcessing ? (
    message.warning('当前有文章任务在进行，请勿操作'),
    isProcessing
  ) : isProcessing
}

// ------------------------------------
// Article List 请求
// ------------------------------------
const FETCH_ARTICLE_LIST_REQUEST = 'FETCH_ARTICLE_LIST_REQUEST'
const FETCH_ARTICLE_LIST_SUCCESS = 'FETCH_ARTICLE_LIST_SUCCESS'
const FETCH_ARTICLE_LIST_FAILURE = 'FETCH_ARTICLE_LIST_FAILURE'

// list请求开始
export const requestList = refresh => ({
  type: FETCH_ARTICLE_LIST_REQUEST,
  payload: refresh
})

// list请求成功
export const requestListSuccess = (data, refresh) => ({
  type: FETCH_ARTICLE_LIST_SUCCESS,
  payload: { ...data, refresh }
})

// list请求失败
export const requestListFailure = err => ({
  type: FETCH_ARTICLE_LIST_FAILURE,
  payload: err
})

// 请求
// refresh 是否刷新列表 default: false
export const fetchArticleList = (params = {}, refresh = false) => (dispatch, getState) => {
  if (isProcessCarryOut(getState())) {
    return
  }
  // 请求开始
  dispatch(requestList(refresh))
  return Service.article.getList({ params }).then(({ code, data }) => {
    if (!code) {
      // 请求成功
      dispatch(requestListSuccess(data, refresh))
    }
    return code
  }).catch(err => {
    // 请求失败
    dispatch(requestListFailure(err))
    return err
  })
}

// ------------------------------------
// Article Item 查看
// ------------------------------------
const VIEW_ARTICLE_ITEM = 'VIEW_ARTICLE_ITEM'

export const viewArticleItem = currentId => ({
  type: VIEW_ARTICLE_ITEM,
  payload: currentId
})

// ------------------------------------
// Article Item 编辑
// ------------------------------------
const EDIT_ARTICLE_ITEM_REQUEST = 'EDIT_ARTICLE_ITEM_REQUEST'
const EDIT_ARTICLE_ITEM_SUCCESS = 'EDIT_ARTICLE_ITEM_SUCCESS'
const EDIT_ARTICLE_ITEM_FAILURE = 'EDIT_ARTICLE_ITEM_FAILURE'

export const editArticleRequest = () => ({
  type: EDIT_ARTICLE_ITEM_REQUEST
})

export const editArticleFailure = err => ({
  type: EDIT_ARTICLE_ITEM_FAILURE,
  payload: err
})

export const editArticleSuccess = ({id, data, status}) => ({
  type: EDIT_ARTICLE_ITEM_SUCCESS,
  payload: { id, data, status }
})

// 分两种
// 1. 批量状态修改 （只是article的状态）
// 2. 单篇内容修改 （包含article其他内容，不仅是状态）
export const editArticleItem = (params = {}, id, status) => (dispatch, getState) => {
  if (isProcessCarryOut(getState())) {
    return
  }
  if (isType(id, 'array')) {
    return Service.article.batchUpdate({
      article_ids: id,
      state: status
    }).then(({ code }) => {
      if (!code) {
        dispatch(editArticleSuccess({id, status}))
      }
    }).catch(err => dispatch(editArticleFailure(err)))
  }
  return Service.article.editItem(id)(params).then(({ code, data }) => {
    if (!code) {
      dispatch(editArticleSuccess({id, data}))
    }
    return code
  }).catch(err => dispatch(editArticleFailure(err)))
}

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
  if (isProcessCarryOut(getState())) {
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
  [FETCH_ARTICLE_LIST_REQUEST]: (state, refresh) => ({
    ...state,
    [refresh ? 'refreshing' : 'fetching']: true
  }),
  [FETCH_ARTICLE_LIST_SUCCESS]: (state, { list, pagination, refresh }) => {
    return {
      ...state,
      refreshing: false,
      fetching: false,
      list: refresh ? list : [...state.list, ...list],
      pagination
    }
  },
  [FETCH_ARTICLE_LIST_FAILURE]: (state, err) => ({
    ...state,
    refreshing: false,
    fetching: false
  }),
  [VIEW_ARTICLE_ITEM]: (state, currentId) => ({
    ...state,
    currentId
  }),
  [EDIT_ARTICLE_ITEM_REQUEST]: state => ({
    ...state,
    saving: true
  }),
  [EDIT_ARTICLE_ITEM_FAILURE]: state => ({
    ...state,
    saving: false
  }),
  [EDIT_ARTICLE_ITEM_SUCCESS]: (state, { id, data, status }) => {
    const articleList = [...state.list]
    if (isType(id, 'array')) {
      // 批量修改状态
      id.map(article_id => {
        let index = state.list.findIndex(item => item._id === article_id)
        articleList[index].state = status
        return article_id
      })
    } else {
      // 单片修改内容
      const index = state.list.findIndex(item => item._id === id)
      articleList.splice(index, 1, data)
    }
    return {
      ...state,
      saving: false,
      list: articleList
    }
  },
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
  refreshing: false,  // 列表刷新状态
  list: [],           // 列表LIST
  pagination: {},     // 列表分页信息
  currentId: ''       // 当前正在查看/编辑的文章ID
}
export default function articleListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action.payload) : state
}
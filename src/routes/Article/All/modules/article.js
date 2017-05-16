// 文章列表

import Service from '~service'

// ------------------------------------
// Article List 请求
// ------------------------------------
export const FETCH_ARTICLE_LIST_REQUEST = 'FETCH_ARTICLE_LIST_REQUEST'
export const FETCH_ARTICLE_LIST_SUCCESS = 'FETCH_ARTICLE_LIST_SUCCESS'
export const FETCH_ARTICLE_LIST_FAILURE = 'FETCH_ARTICLE_LIST_FAILURE'

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
export const fetchList = (params = {}, filter = {}, sorter = {}, refresh = true) => (dispatch, getState) => {
  if (getState().article.list.fetching) {
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
export const EDIT_ARTICLE_ITEM_REQUEST = 'EDIT_ARTICLE_ITEM_REQUEST'
export const EDIT_ARTICLE_ITEM_SUCCESS = 'EDIT_ARTICLE_ITEM_SUCCESS'
export const EDIT_ARTICLE_ITEM_FAILURE = 'EDIT_ARTICLE_ITEM_FAILURE'

export const editArticleRequest = () => ({
  type: EDIT_ARTICLE_ITEM_REQUEST
})

export const editArticleSuccess = ({data, index, isBatch = false, indexes, status}) => ({
  type: EDIT_ARTICLE_ITEM_SUCCESS,
  payload: { data, index, isBatch, indexes, status }
})

export const editArticleFailure = (err) => ({
  type: EDIT_ARTICLE_ITEM_FAILURE,
  payload: err
})

// 分两种
// 1. 批量状态修改 （只是article的状态）
// 2. 单篇内容修改 （包含article其他内容，不仅是状态）
export const editArticle = (params = {}, id, index) => (dispatch, getState) => {
  if (getState().article.list.editing) {
    return
  }
  dispatch(editArticleRequest())
  const { article_ids } = params
  if (article_ids) {
    const { indexes, state } = params
    // 批量修改 type: PATCH
    return Service.article.batchUpdate({ article_ids, state }).then(({ code, data }) => {
      if (!code) {
        dispatch(editArticleSuccess({
          isBatch: true,
          status: state,
          indexes
        }))
      }
    }).catch(err => dispatch(editArticleFailure(err)))
  }
  // 单篇文章内容修改
  return Service.article.modifyItem(id)({ params }).then(({ code, data }) => {
    if (!code) {
      dispatch(editArticleSuccess({ data, index }))
    }
  }).catch(err => dispatch(editArticleFailure(err)))
}

// ------------------------------------
// Article Item 删除
// ------------------------------------
export const DELETE_ARTICLE_ITEM_REQUEST = 'DELETE_ARTICLE_ITEM_REQUEST'
export const DELETE_ARTICLE_ITEM_SUCCESS = 'DELETE_ARTICLE_ITEM_SUCCESS'
export const DELETE_ARTICLE_ITEM_FAILURE = 'DELETE_ARTICLE_ITEM_FAILURE'

export const deleteArticleRequest = () => ({
  type: DELETE_ARTICLE_ITEM_REQUEST
})

export const deleteArticleFailure = err => ({
  type: DELETE_ARTICLE_ITEM_FAILURE,
  payload: err
})

export const deleteArticleSuccess = ({index, isBatch = false, indexes}) => ({
  type: DELETE_ARTICLE_ITEM_SUCCESS,
  payload: { index, isBatch, indexes }
})

// 包含 1. 单篇删除   2. 批量删除
// 但是目前只用到了2，因为其实就是将单篇的id包装成一个数组而已
// 目前未找到用1的场景，但这里先写下了
export const deleteArticle = (params = {}, id, index) => (dispatch, getState) => {
  if (getState().article.list.deleting) {
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
    list: {
      ...state.list,
      fetching: true
    }
  }),
  [FETCH_ARTICLE_LIST_SUCCESS]: (state, { list, pagination, filter, sorter, refresh }) => {
    return {
      list: {
        ...state.list,
        fetching: false,
        data: refresh ? [...list] : [...state.list.data, ...list],
        pagination,
        filter,
        sorter
      }
    }
  },
  [FETCH_ARTICLE_LIST_FAILURE]: (state, err) => ({
    list: {
      ...state.list,
      fetching: false
    }
  }),
  [EDIT_ARTICLE_ITEM_REQUEST]: state => ({
    list: {
      ...state.list,
      editing: true
    }
  }),
  [EDIT_ARTICLE_ITEM_SUCCESS]: (state, { data, index, isBatch, indexes, status }) => {
    const articleList = [...state.list.data]
    if (isBatch) {
      // 批量修改状态
      indexes.forEach((item, index) => {
        articleList[item].state = status
      })
    } else {
      // 单篇内容修改
      articleList.splice(index, 1, data)
    }
    return {
      list: {
        ...state.list,
        editing: false,
        data: articleList
      }
    }
  },
  [EDIT_ARTICLE_ITEM_FAILURE]: (state, err) => ({
    list: {
      ...state.list,
      editing: false
    }
  }),
  [DELETE_ARTICLE_ITEM_REQUEST]: state => ({
    list: {
      ...state.list,
      deleting: true
    }
  }),
  [DELETE_ARTICLE_ITEM_FAILURE]: state => ({
    list: {
      ...state.list,
      deleting: false
    }
  }),
  [DELETE_ARTICLE_ITEM_SUCCESS]: (state, { index, isBatch, indexes }) => {
    let articleList = [...state.list.data]
    if (isBatch) {
      // 批量修改状态
      articleList = [...state.list.data].filter((item, index) => {
        return !indexes.includes(index)
      })
    } else {
      // 单篇内容修改
      articleList.splice(index, 1)
    }
    return {
      list: {
        ...state.list,
        deleting: false,
        data: articleList
      }
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: {
    fetching: false,    // 列表获取状态
    editing: false,     // 列表编辑状态
    deleting: false,    // 列表删除状态
    data: [],           // 列表LIST
    pagination: {},     // 列表分页信息
    filter: {},         // 列表过滤信息
    sorter: {}
  }
}
export default function articleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action.payload) : state
}


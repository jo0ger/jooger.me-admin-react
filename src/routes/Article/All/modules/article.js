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
export const fetchList = (params = {}, refresh = true) => (dispatch, getState) => {
  if (getState().article.list.fetching) {
    // TODO 提示 请勿频繁操作？？？
    return
  }
  // 请求开始
  dispatch(requestList())
  return Service.article.getList({ params }).then(({ code, data }) => {
    if (!code) {
      // 请求成功
      dispatch(requestListSuccess(data, refresh))
    }
  }).catch(err => {
    // 请求失败
    dispatch(requestListFailure(err))
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
// 1. 批量状态修改 （article的状态）
// 2. 单篇内容修改
export const editArticle = (params = {}, index) => (dispatch, getState) => {
  if (getState().article.list.editing) {
    return
  }
  dispatch(editArticleRequest())
  if (params.article_ids) {
    const { indexes, state } = params
    // 批量修改 type: PATCH
    return Service.article.batchUpdate({ params }).then(({ code, data }) => {
      if (!code) {
        dispatch(editArticleSuccess({
          isBatch: true,
          status: state,
          indexes
        }))
      }
    }).catch(err => dispatch(editArticleFailure(err)))
  }
  return Service.article.modifyItem({ params }).then(({ code, data }) => {
    if (!code) {
      dispatch(editArticleSuccess({ data, index }))
    }
  }).catch(err => dispatch(editArticleFailure(err)))
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
  [FETCH_ARTICLE_LIST_SUCCESS]: (state, { list, pagination, refresh }) => {
    return {
      list: {
        ...state.list,
        fetching: false,
        data: refresh ? [...list] : [...state.list.data, ...list],
        pagination
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
    const articleList = [...state.article.list.data]
    if (isBatch) {
      // 批量修改状态
      indexes.forEach((item, index) => {
        articleList.state = status
      })
    } else {
      // 单篇内容修改
      articleList.splice(index, 1, data)
    }
    return {
      ...state.article.list,
        editing: false,
        data: articleList
    }
  },
  [EDIT_ARTICLE_ITEM_FAILURE]: (state, err) => ({
    list: {
      ...state.list,
      editing: false
    }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: {
    fetching: false,
    editing: false,
    data: [],
    pagination: {}
  }
}
export default function articleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action.payload) : state
}


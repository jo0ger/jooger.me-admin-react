// 文章列表

import { fromJS } from 'immutable'
import Service from '~service'
import { message } from 'antd'
import { isType } from '~utils'

const defaultArticleModel = {
  title: '这是一篇新文章',
  content: '这是新文章的内容',
  excerpt: '',
  keywords: [],
  thumbs: [],
  state: 0,
  category: '',
  tag: [],
  meta: {
    visit: 0,
    likes: 0,
    comments: 0
  },
  extends: []
}

// 现在是否有任务在进行
const isProcessCarryOut = state => {
  const { creating, fetching, saving, deleting } = state.get('article').toJS()
  const isProcessing = creating || fetching || saving || deleting
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
  payload: { data, refresh }
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
    } else {
      dispatch(requestListFailure())
    }
    return code
  }).catch(err => {
    // 请求失败
    dispatch(requestListFailure(err))
    return err
  })
}

// ------------------------------------
// Article Item 新建
// ------------------------------------
const CREATE_ARTICLE_ITEM_REQUEST = 'CREATE_ARTICLE_ITEM_REQUEST'
const CREATE_ARTICLE_ITEM_SUCCESS = 'CREATE_ARTICLE_ITEM_SUCCESS'
const CREATE_ARTICLE_ITEM_FAILURE = 'CREATE_ARTICLE_ITEM_FAILURE'

export const createArticleItemRequest = () => ({
  type: CREATE_ARTICLE_ITEM_REQUEST
})

export const createArticleItemFailure = err => ({
  type: CREATE_ARTICLE_ITEM_FAILURE,
  payload: err
})

export const createArticleItemSuccess = data => ({
  type: CREATE_ARTICLE_ITEM_SUCCESS,
  payload: data
})

export const createArticleItem = (params = defaultArticleModel) => (dispatch, getState) => {
  if (isProcessCarryOut(getState())) {
    return
  }
  dispatch(createArticleItemRequest())
  return Service.article.create({ data: params }).then(({ code, data }) => {
    if (!code) {
      dispatch(createArticleItemSuccess(data))
    } else {
      dispatch(createArticleItemFailure())
    }
  }).catch(err => dispatch(createArticleItemFailure(err)))
}


// ------------------------------------
// Article Item 查看
// ------------------------------------
const VIEW_ARTICLE_ITEM = 'VIEW_ARTICLE_ITEM'

export const viewArticleItem = (currentArticleId = '') => ({
  type: VIEW_ARTICLE_ITEM,
  payload: currentArticleId
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
  dispatch(editArticleRequest())
  if (isType(id, 'array')) {
    return Service.article.batchUpdate({
      data: {
        article_ids: id,
        state: status
      }
    }).then(({ code }) => {
      if (!code) {
        dispatch(editArticleSuccess({ id, status }))
      } else {
        dispatch(editArticleFailure())
      }
    }).catch(err => dispatch(editArticleFailure(err)))
  }
  return Service.article.editItem(id)({ data: params }).then(({ code, data }) => {
    if (!code) {
      dispatch(editArticleSuccess({id, data: data.toJS()}))
    } else {
      dispatch(editArticleFailure())
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

export const deleteArticleSuccess = id => ({
  type: DELETE_ARTICLE_ITEM_SUCCESS,
  payload: id
})

// 包含 1. 单篇删除   2. 批量删除
// 但是目前只用到了2，因为其实就是将单篇的id包装成一个数组而已
// 目前未找到用1的场景，但这里先写下了
export const deleteArticleItem = (id) => (dispatch, getState) => {
  const curState = getState()
  if (isProcessCarryOut(curState)) {
    return
  }
  dispatch(deleteArticleRequest())
  if (isType(id, 'array')) {
    return Service.article.batchDelete({
      data: {
        article_ids: id
      }
    }).then(({ code }) => {
      if (!code) {
        if (id.includes(curState.currentArticleId)) {
          dispatch(viewArticleItem(''))
        }
        dispatch(deleteArticleSuccess(id))
      } else {
        dispatch(deleteArticleFailure())
      }
      return !code
    }).catch(err => dispatch(deleteArticleFailure(err)))
  }
  return Service.article.deleteItem(id)().then(({ code, data }) => {
    if (!code) {
      if (id === curState.currentArticleId) {
        dispatch(viewArticleItem(''))
      }
      dispatch(deleteArticleSuccess(id))
    } else {
      dispatch(deleteArticleFailure())
    }
    return !code
  }).catch(err => dispatch(deleteArticleFailure(err)))
}

// ------------------------------------
// ACTION HANDLERS
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ARTICLE_LIST_REQUEST]: (state, { refresh }) => {
    return state.merge({
      [refresh ? 'refreshing' : 'fetching']: true
    })
  },
  [FETCH_ARTICLE_LIST_SUCCESS]: (state, { data, refresh }) => {
    const list = data.get('list')
    return state.merge({
      refreshing: false,
      fetching: false,
      list: refresh ? list : state.get('list').concat(list),
      pagination: data.get('pagination')
    })
  },
  [FETCH_ARTICLE_LIST_FAILURE]: (state, err) => {
    return state.merge({
      refreshing: false,
      fetching: false
    })
  },
  [VIEW_ARTICLE_ITEM]: (state, currentArticleId) => {
    return state.merge({ currentArticleId })
  },
  [CREATE_ARTICLE_ITEM_REQUEST]: state => state.merge({ creating: true }),
  [CREATE_ARTICLE_ITEM_FAILURE]: state => state.merge({ creating: false }),
  [CREATE_ARTICLE_ITEM_SUCCESS]: (state, data) => {
    return state.merge({
      list: state.get('list').unshift(data).toJS(),
      creating: false
    })
  },
  [EDIT_ARTICLE_ITEM_REQUEST]: state => state.merge({ saving: true }),
  [EDIT_ARTICLE_ITEM_FAILURE]: state => state.merge({ saving: false }),
  [EDIT_ARTICLE_ITEM_SUCCESS]: (state, { id, data, status }) => {
    const articleList = state.get('list').toJS()
    if (isType(id, 'array')) {
      // 批量修改状态
      id.map(article_id => {
        let index = articleList.findIndex(item => item._id === article_id)
        articleList[index].state = status
        return article_id
      })
    } else {
      // 单篇修改内容
      const index = articleList.findIndex(item => item._id === id)
      articleList.splice(index, 1, data)
    }
    return state.merge({
      saving: false,
      list: articleList
    })
  },
  [DELETE_ARTICLE_ITEM_REQUEST]: state => state.merge({ deleting: true }),
  [DELETE_ARTICLE_ITEM_FAILURE]: state => state.merge({ deleting: false }),
  [DELETE_ARTICLE_ITEM_SUCCESS]: (state, id) => {
    let articleList = state.toJS().list
    if (isType(id, 'array')) {
      // 批量删除
      id.map(article_id => {
        let index = articleList.findIndex(item => item._id === article_id)
        articleList.splice(index, 1)
        return article_id
      })
    } else {
      // 单篇删除
      const index = articleList.findIndex(item => item._id === id)
      articleList.splice(index, 1)
    }
    return state.merge({
      deleting: false,
      list: articleList
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  fetching: false,            // 列表获取状态
  creating: false,            // 文章新建状态
  saving: false,              // 列表保存状态
  deleting: false,            // 列表删除状态
  refreshing: false,          // 列表刷新状态
  list: [],                   // 列表LIST
  pagination: {},             // 列表分页信息
  currentArticleId: '593bc036e1f07c2e2c37901c'        // 当前正在查看/编辑的文章ID
})
export default function articleListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action.payload) : state
}

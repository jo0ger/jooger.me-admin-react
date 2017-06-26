// Category 分类

import { fromJS } from 'immutable'
import Service from '~service'
import { message } from 'antd'

const defaultCategoryModel = {
  name: '',
  description: '',
  extends: []
}

// 现在是否有任务在进行
const isProcessCarryOut = state => {
  const { creating, fetching, saving, deleting } = state.get('category').toJS()
  const isProcessing = creating || fetching || saving || deleting
  return isProcessing ? (
    message.warning('当前有文章任务在进行，请勿操作'),
    isProcessing
  ) : isProcessing
}

// ------------------------------------
// Category 获取请求
// ------------------------------------
export const FETCH_CATEGORY_LIST_REQUEST = 'FETCH_CATEGORY_LIST_REQUEST'
export const FETCH_CATEGORY_LIST_SUCCESS = 'FETCH_CATEGORY_LIST_SUCCESS'
export const FETCH_CATEGORY_LIST_FAILURE = 'FETCH_CATEGORY_LIST_FAILURE'

export const requestCategoryList = () => ({
  type: FETCH_CATEGORY_LIST_REQUEST
})

export const requestCategoryListFailure = err => ({
  type: FETCH_CATEGORY_LIST_FAILURE,
  payload: err
})

export const requestCategoryListSuccess = data => ({
  type: FETCH_CATEGORY_LIST_SUCCESS,
  payload: data
})

export const fetchCategoryList = () => (dispatch, getState) => {
  if (getState().getIn(['category', 'fetching'])) {
    return
  }
  dispatch(requestCategoryList())
  return Service.category.getList().then(({code, data}) => {
    if (!code) {
      dispatch(requestCategoryListSuccess(data))
    }
    return code
  }).catch(err => dispatch(requestCategoryListFailure(err)))
}


// ------------------------------------
// Category Item 新建
// ------------------------------------
const CREATE_CATEGORY_ITEM_REQUEST = 'CREATE_CATEGORY_ITEM_REQUEST'
const CREATE_CATEGORY_ITEM_SUCCESS = 'CREATE_CATEGORY_ITEM_SUCCESS'
const CREATE_CATEGORY_ITEM_FAILURE = 'CREATE_CATEGORY_ITEM_FAILURE'

export const createCategoryItemRequest = () => ({
  type: CREATE_CATEGORY_ITEM_REQUEST
})

export const createCategoryItemFailure = err => ({
  type: CREATE_CATEGORY_ITEM_FAILURE,
  payload: err
})

export const createCategoryItemSuccess = data => ({
  type: CREATE_CATEGORY_ITEM_SUCCESS,
  payload: data
})

export const createCategoryItem = (params = defaultCategoryModel) => (dispatch, getState) => {
  if (isProcessCarryOut(getState())) {
    return
  }
  return Service.category.create({ data: params }).then(({ code, data }) => {
    if (!code) {
      dispatch(createCategoryItemSuccess(data))
    } else {
      dispatch(createCategoryItemFailure())
    }
    return code
  }).catch(err => dispatch(createCategoryItemFailure(err)))
}

// ------------------------------------
// Caterogy Item 删除
// ------------------------------------
const DELETE_CATEGORY_ITEM_REQUEST = 'DELETE_CATEGORY_ITEM_REQUEST'
const DELETE_CATEGORY_ITEM_FAILURE = 'DELETE_CATEGORY_ITEM_FAILURE'
const DELETE_CATEGORY_ITEM_SUCCESS = 'DELETE_CATEGORY_ITEM_SUCCESS'

export const deleteCategoryItemRequest = () => ({
  type: DELETE_CATEGORY_ITEM_REQUEST
})

export const deleteCategoryItemFailure = err => ({
  type: DELETE_CATEGORY_ITEM_FAILURE,
  payload: err
})

export const deleteCategoryItemSuccess = index => ({
  type: DELETE_CATEGORY_ITEM_SUCCESS,
  payload: index
})

export const deleteCategoryItem = (id, index) => (dispatch, getState) => {
  if (isProcessCarryOut(getState())) {
    return
  }
  dispatch(deleteCategoryItemRequest())
  return Service.category.deleteItem(id)().then(({ code }) => {
    if (!code) {
      dispatch(deleteCategoryItemSuccess(index))
    } else {
      dispatch(deleteCategoryItemFailure())
    }
  }).catch(err => dispatch(DELETE_CATEGORY_ITEM_FAILURE(err)))
}

// ------------------------------------
// Article Detail 获取请求
// ------------------------------------

// ------------------------------------
// ACTION_HANDLERS
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_CATEGORY_LIST_REQUEST]: state => state.merge({ fetching: true }),
  [FETCH_CATEGORY_LIST_FAILURE]: state => state.merge({ fetching: false }),
  [FETCH_CATEGORY_LIST_SUCCESS]: (state, data) => state.merge({ fetching: false, list: data.get('list') }),
  [CREATE_CATEGORY_ITEM_REQUEST]: state => state.merge({ creating: true }),
  [CREATE_CATEGORY_ITEM_REQUEST]: state => state.merge({ creating: false }),
  [CREATE_CATEGORY_ITEM_SUCCESS]: (state, data) => state.merge({
    list: state.get('list').unshift(data).toJS(),
    creating: false
  }),
  [DELETE_CATEGORY_ITEM_REQUEST]: state => state.merge({ deleting: true }),
  [DELETE_CATEGORY_ITEM_REQUEST]: state => state.merge({ deleting: false }),
  [DELETE_CATEGORY_ITEM_SUCCESS]: (state, index) => {
    let categoryList = state.get('list').toJS()
    categoryList.splice(index, 1)
    return state.merge({
      deleting: false,
      list: categoryList
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  fetching: false,
  saving: false,
  creating: false,
  deleting: false,
  list: []
})
export default function categoryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action.payload) : state
}

// Category 分类

import Service from '~service'

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
  if (getState().category.fetching) {
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
// Article Detail 获取请求
// ------------------------------------

// ------------------------------------
// Article Detail 获取请求
// ------------------------------------

// ------------------------------------
// Article Detail 获取请求
// ------------------------------------

// ------------------------------------
// ACTION_HANDLERS
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_CATEGORY_LIST_REQUEST]: state => ({
    ...state,
    fetching: true
  }),
  [FETCH_CATEGORY_LIST_FAILURE]: state => ({
    ...state,
    fetching: false
  }),
  [FETCH_CATEGORY_LIST_SUCCESS]: (state, { list }) => ({
    ...state,
    fetching: false,
    data: list
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  saving: false,
  data: []
}
export default function categoryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action.payload) : state
}

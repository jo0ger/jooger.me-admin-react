// 文章详情

import Service from '~service'

// ------------------------------------
// Article Detail 获取请求
// ------------------------------------
export const FETCH_ARTICLE_DETAIL_REQUEST = 'FETCH_ARTICLE_DETAIL_REQUEST'
export const FETCH_ARTICLE_DETAIL_SUCCESS = 'FETCH_ARTICLE_DETAIL_SUCCESS'
export const FETCH_ARTICLE_DETAIL_FAILURE = 'FETCH_ARTICLE_DETAIL_FAILURE'

export const requestArticleDetail = () => ({
  type: FETCH_ARTICLE_DETAIL_REQUEST
})

export const requestArticleDetailFailure = err => ({
  type: FETCH_ARTICLE_DETAIL_FAILURE,
  payload: err
})

export const requestArticleDetailSuccess = data => ({
  type: FETCH_ARTICLE_DETAIL_SUCCESS,
  payload: data
})

export const fetchArticleDetail = id => (dispatch, getState) => {
  if (getState().articleDetail.fetching) {
    return
  }
  dispatch(requestArticleDetail())
  return Service.article.getItem(id)().then(({ code, data}) => {
    if (!code) {
      dispatch(requestArticleDetailSuccess(data))
    }
    return code
  }).catch(err => dispatch(requestArticleDetailFailure(err)))
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
// Article Detail 获取请求
// ------------------------------------
// ------------------------------------
// Article Detail 获取请求
// ------------------------------------

// ------------------------------------
// Article Detail 获取请求
// ------------------------------------

// ------------------------------------
// ACTION HANDLERS
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ARTICLE_DETAIL_REQUEST]: state => ({
    ...state,
    fetching: true
  }),
  [FETCH_ARTICLE_DETAIL_FAILURE]: state => ({
    ...state,
    fetching: false
  }),
  [FETCH_ARTICLE_DETAIL_SUCCESS]: (state, data) => ({
    ...state,
    fetching: false,
    data
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  saving: false,
  data: {}
}
export default function articleDetailReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action.payload) : initialState
}

// Tag 分类

import { fromJS } from 'immutable'
import Service from '~service'

// ------------------------------------
// Tag 获取请求
// ------------------------------------
export const FETCH_TAG_LIST_REQUEST = 'FETCH_TAG_LIST_REQUEST'
export const FETCH_TAG_LIST_SUCCESS = 'FETCH_TAG_LIST_SUCCESS'
export const FETCH_TAG_LIST_FAILURE = 'FETCH_TAG_LIST_FAILURE'

export const requestTagList = () => ({
  type: FETCH_TAG_LIST_REQUEST
})

export const requestTagListFailure = err => ({
  type: FETCH_TAG_LIST_FAILURE,
  payload: err
})

export const requestTagListSuccess = data => ({
  type: FETCH_TAG_LIST_SUCCESS,
  payload: data
})

export const fetchTagList = () => (dispatch, getState) => {
  if (getState().getIn(['tag', 'fetching'])) {
    return
  }
  dispatch(requestTagList())
  return Service.tag.getList().then(({code, data}) => {
    if (!code) {
      dispatch(requestTagListSuccess(data))
    }
    return code
  }).catch(err => dispatch(requestTagListFailure(err)))
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
  [FETCH_TAG_LIST_REQUEST]: state => state.merge({ fetching: true }),
  [FETCH_TAG_LIST_FAILURE]: state => state.merge({ fetching: false }),
  [FETCH_TAG_LIST_SUCCESS]: (state, data) => state.merge({ fetching: false, list: data.get('list') })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  fetching: false,
  saving: false,
  list: []
})
export default function tagReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action.payload) : state
}

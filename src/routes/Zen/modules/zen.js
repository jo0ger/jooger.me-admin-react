import Service from '~service'
/**
 * Constants
 */
const FETCH_ZEN_REQUEST = 'ZEN_REQUEST'
const FETCH_ZEN_SUCCESS = 'FETCH_ZEN_SUCCESS'
const FETCH_ZEN_FAILURE = 'FETCH_ZEN_FAILURE'
const CLEAR_ZEN = 'CLEAR_ZEN'

/**
 * Actions
 */
export const requestZen = () => ({
  type: FETCH_ZEN_REQUEST
})

let seed = 0
export const requestZenSuccess = (text) => ({
  type: FETCH_ZEN_SUCCESS,
  payload: { id: seed++, text }
})

export const requestZenFailure = () => ({
  type: FETCH_ZEN_FAILURE
})

export const clearZen = () => ({
  type: CLEAR_ZEN
})

export const fetchZen = () => {
  return (dispatch, getState) => {
    if (getState().zen.fetching) {
      return
    }
    dispatch(requestZen())
    return Service.fetchZen().then(({ data }) => {
      dispatch(requestZenSuccess(data))
    }).catch(err => dispatch(requestZenFailure(err)))
  }
}

export const actions = {
  requestZen,
  requestZenSuccess,
  requestZenFailure,
  clearZen,
  fetchZen
}

/**
 * Actions Handlers
 */
const ACTION_HANDLERS = {
  [FETCH_ZEN_REQUEST]: state => ({
    ...state,
    fetching: true
  }),
  [FETCH_ZEN_SUCCESS]: (state, action) => ({
    ...state,
    fetching: false,
    text: [...state.text, action.payload]
  }),
  [FETCH_ZEN_FAILURE]: state => ({ ...state, fetching: false }),
  [CLEAR_ZEN]: state => ({ ...state, text: [] })
}

/**
 * Reducer
 */
const initialState = {
  fetching: false,
  text: []
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

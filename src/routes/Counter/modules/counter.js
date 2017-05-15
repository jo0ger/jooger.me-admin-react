// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export const increment = (value = 1) => ({
  type: COUNTER_INCREMENT,
  payload: value
})

// ------------------------------------
// Async Actions
// ------------------------------------
export const doubleAsync = () => {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch({
        type: COUNTER_DOUBLE_ASYNC,
        payload: getState().count
      })
      resolve()
    }, 500)
  })
}

export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Actions Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC]: (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

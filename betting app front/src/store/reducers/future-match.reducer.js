export const SET_FUTURE_MATCH = "SET_FUTURE_MATCH"
export const SET_IS_LOADING = "SET_IS_LOADING"

const initialState = {
  futureMatches: null,
  isLoading: true,
}

export function futureMatchReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_FUTURE_MATCH:
      return {
        ...state,
        futureMatches: cmd.futureMatches,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: cmd.isLoading,
      }
    default:
      return state;
  }
}

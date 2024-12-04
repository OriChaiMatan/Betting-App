export const SET_PREVIOUS_MATCH = "SET_PREVIOUS_MATCH"
export const SET_IS_LOADING = "SET_IS_LOADING"

const initialState = {
  previousMatches: [],
  isLoading: true,
}

export function previousMatchReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_PREVIOUS_MATCH:
      return {
        ...state,
        previousMatches: cmd.previousMatches,
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

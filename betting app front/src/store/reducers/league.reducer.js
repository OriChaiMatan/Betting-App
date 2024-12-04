export const SET_LEAGUES = "SET_LEAGUES"
export const SET_IS_LOADING = "SET_IS_LOADING"

const initialState = {
  leagues: [],
  isLoading: true,
}

export function leagueReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_LEAGUES:
      return {
        ...state,
        leagues: cmd.leagues,
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

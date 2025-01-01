import { gamesService } from "../../services/games.service"

export const SET_PREVIOUS_MATCH = "SET_PREVIOUS_MATCH"
export const SET_IS_LOADING = "SET_IS_LOADING"
export const SET_FILTER_BY = "SET_FILTER_BY"

const initialState = {
  previousMatches: [],
  isLoading: true,
  filterBy: gamesService.getDefaultFilter(),
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
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...state.filterBy, ...cmd.fieldsToUpdate },
      }
    default:
      return state;
  }
}

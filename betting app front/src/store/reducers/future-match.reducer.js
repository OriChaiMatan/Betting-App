import { gamesService } from "../../services/games.service"

export const SET_FUTURE_MATCH = "SET_FUTURE_MATCH"
export const SET_FILTER_BY = "SET_FILTER_BY"
export const SET_IS_LOADING = "SET_IS_LOADING"

const initialState = {
    futureMatches: [],
    filterBy: gamesService.getDefaultFilter(),
    isLoading: true,
}

export function futureMatchReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_FUTURE_MATCH:
            return {
                ...state,
                futureMatches: cmd.futureMatches,
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.fieldsToUpdate },
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

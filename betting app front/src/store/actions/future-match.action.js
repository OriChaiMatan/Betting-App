import { gamesService } from "../../services/games.service"
import { SET_FUTURE_MATCH, SET_FILTER_BY, SET_IS_LOADING } from "../reducers/future-match.reducer"
import { store } from "../store"

export async function loadFutureMatches() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    // const { filterBy } = store.getState().futureMatchModule
    const futureMatches = await gamesService.getFutureGames()
    store.dispatch({ type: SET_FUTURE_MATCH, futureMatches })
  } catch (err) {
    console.log("Had issues loading future matches", err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export function setFilterBy(fieldsToUpdate) {
    store.dispatch({ type: SET_FILTER_BY, fieldsToUpdate });
  }

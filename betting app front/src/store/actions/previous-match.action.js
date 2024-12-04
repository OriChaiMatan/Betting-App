import { gamesService } from "../../services/games.service"
import { SET_PREVIOUS_MATCH, SET_IS_LOADING } from "../reducers/previous-match.reducer"
import { store } from "../store"

export async function loadPreviousMatches() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const previousMatches = await gamesService.getPastGames()
    store.dispatch({ type: SET_PREVIOUS_MATCH, previousMatches })
  } catch (err) {
    console.log("Had issues loading previous matches", err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

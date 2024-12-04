import { leaguesService } from "../../services/leagues.service"
import { SET_LEAGUES, SET_IS_LOADING } from "../reducers/league.reducer"
import { store } from "../store"

export async function loadLeagues() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const leagues = await leaguesService.query()
    store.dispatch({ type: SET_LEAGUES, leagues })
  } catch (err) {
    console.log("Had issues loading leagues", err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { leagueReducer } from './reducers/league.reducer'
import { futureMatchReducer } from './reducers/future-match.reducer'
import { previousMatchReducer } from './reducers/previous-match.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    leagueModule: leagueReducer,
    futureMatchModule: futureMatchReducer,
    previousMatchModule: previousMatchReducer
   // userModule: userReducer // Add after build user auth
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
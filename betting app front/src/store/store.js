import { combineReducers, compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { leagueReducer } from './reducers/league.reducer'
import { futureMatchReducer } from './reducers/future-match.reducer'
import { previousMatchReducer } from './reducers/previous-match.reducer'
import { userReducer } from './reducers/user.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    leagueModule: leagueReducer,
    futureMatchModule: futureMatchReducer,
    previousMatchModule: previousMatchReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.gStore = store
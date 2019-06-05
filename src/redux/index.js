import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import ReduxThunk from 'redux-thunk'
import ReduxDucks from './ducks'

const store = createStore(
    ReduxDucks,
    {},
    composeWithDevTools(applyMiddleware(ReduxThunk))
)

export default store
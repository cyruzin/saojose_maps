import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import ReduxDucks from './ducks'

const store = createStore(ReduxDucks, {}, applyMiddleware(ReduxThunk))

export default store
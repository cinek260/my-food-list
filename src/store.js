import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers, { initialState } from './reducer'

const middleware = applyMiddleware(thunkMiddleware)

export default () => {
  const rootReducer = combineReducers({
    ...reducers
  })

  return createStore(rootReducer, initialState, middleware);
}

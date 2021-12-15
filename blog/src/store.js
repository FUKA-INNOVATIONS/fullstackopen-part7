import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import notificationReducer from './reducers/notificationReducer'
import postReducer from './reducers/postReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  posts: postReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store
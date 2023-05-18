//导入store，中间件函数
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
//引入Reduers
import LoginReducer from './reducers/login'
import UserReducer from './reducers/user'
import ArticleReducer from './reducers/article'

import thunk from 'redux-thunk'

const allReducers = combineReducers({
    deng: LoginReducer,
    user: UserReducer,
    article:ArticleReducer
})

export default createStore(allReducers, applyMiddleware(thunk));
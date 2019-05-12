import { combineReducers } from 'redux';
import userState from './userReducer';
import productState from './productReducer'

export default combineReducers({
    userState: userState,
    productState: productState
})
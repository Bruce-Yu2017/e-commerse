import { combineReducers } from 'redux';
import userState from './userReducer';
import productState from './productReducer'
import productListState from './productListReducer'

export default combineReducers({
    userState: userState,
    productState: productState,
    productListState: productListState
})
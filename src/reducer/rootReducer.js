import { combineReducers } from 'redux';
import userState from './userReducer';

export default combineReducers({
    userState: userState
})
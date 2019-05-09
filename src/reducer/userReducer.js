import { REGISTER, CHECK_VALID_USER, INIT_USER_STATE } from '../actions/types';


const initialState = {isValid: false, msg: '', userData: {}, type: ''};
export default (state=initialState, action) => {
    switch(action.type) {
        case REGISTER:
            return action.payload;
        case CHECK_VALID_USER:
            return action.payload;
        case INIT_USER_STATE:
            return action.payload;
        default:
            return state;
    }
}
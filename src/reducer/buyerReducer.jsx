import { UPDATE_CART, GET_BUYER_INFO } from '../actions/types';

const initialState = {};

export default (state=initialState, action) => {
    switch(action.type) {
        case GET_BUYER_INFO:
            return action.payload;
        case UPDATE_CART:
            return action.payload;
        default:
            return state;
    }
    
}
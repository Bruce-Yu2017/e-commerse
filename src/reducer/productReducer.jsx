import { GET_ALL_PRODUCTS } from "../actions/types";

const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

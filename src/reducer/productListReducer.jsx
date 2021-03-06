import { GET_ALL_PRODUCTS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};
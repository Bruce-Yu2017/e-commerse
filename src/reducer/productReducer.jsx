import { GET_ONE_PRODUCT } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_ONE_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

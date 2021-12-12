import { GET_ORDERS } from "./actionTypes";

const INIT_STATE = {
  orders: [],
};

const Order = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default Order;

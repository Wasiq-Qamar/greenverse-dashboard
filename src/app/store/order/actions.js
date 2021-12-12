import api from "../../api";
import { GET_ORDERS } from "./actionTypes";

export const setOrders = (payload) => ({
  type: GET_ORDERS,
  payload,
});

export const getOrders = () => (dispatch) => {
  api
    .get("/orders")
    .then((res) => {
      console.log("orders: ", res.data.length);
      dispatch(setOrders(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

import api from "../../api";
import { GET_DONATIONS } from "./actionTypes";

export const setDonations = (payload) => ({
  type: GET_DONATIONS,
  payload,
});

export const getDonations = () => (dispatch) => {
  api
    .get("/donations")
    .then((res) => {
      dispatch(setDonations(res.data));
    })
    .catch((err) => {
      // console.log(err);
    });
};

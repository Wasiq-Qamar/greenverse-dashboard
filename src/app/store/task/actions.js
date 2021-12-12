import api from "../../api";
import store from "../../store";
import { GET_TASKS } from "./actionTypes";

export const setTasks = (payload) => ({
  type: GET_TASKS,
  payload,
});

export const getTasks = () => (dispatch) => {
  api
    .get("/tasks")
    .then((res) => {
      console.log("tasks: ", res.data.length);
      dispatch(setTasks(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

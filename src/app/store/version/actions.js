import {
  ADD_VERSION,
  SET_SELECTED_VERSION,
  GET_VERSION,
  DELETE_VERSION,
} from "./actionTypes";
import api from "../../api";
import store from "../../store";

export const setSelectedVersion = (payload) => ({
  type: SET_SELECTED_VERSION,
  payload,
});

export const setVersion = (payload) => ({
  type: GET_VERSION,
  payload,
});

export const pushVersion = (payload) => ({
  type: ADD_VERSION,
  payload,
});

export const removeVersion = (payload) => ({
  type: DELETE_VERSION,
  payload,
});

export const addVersion =
  ({ versionName, addedBy }) =>
  (dispatch) => {
    const alert = store.getState().ui.alert;
    api
      .post("/version", { versionName, addedBy })
      .then((res) => {
        const { version } = res.data;
        dispatch(pushVersion(version));
        // console.log(version)
        alert.success("Version added succesfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getVersion = () => (dispatch) => {
  api
    .get("/version")
    .then((res) => {
      const { versions } = res.data;
      dispatch(setVersion(versions));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteVersion =
  ({ id }) =>
  (dispatch) => {
    const alert = store.getState().ui.alert;
    // console.log("Actions: ",id)
    api
      .delete(`/version/${id}`)
      .then((res) => {
        dispatch(removeVersion(id));
        alert.error("Version deleted succesfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "../../../utility/session";
import api from "../../api";
import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN,
  LOGOUT,
  REMOVE_AUTH_ALERT,
  REMOVE_USER,
  SET_USERS,
} from "./actionTypes";

/**
 * Login User
 * @param {object} payload
 * @returns
 */
export const setLogin = (payload) => ({
  type: LOGIN,
  payload,
});

/**
 * Logout User
 * @returns
 */
export const setLogout = () => ({
  type: LOGOUT,
});

export const setAuthSuccess = (payload) => ({
  type: AUTH_SUCCESS,
  payload,
});

export const setAuthError = (payload) => ({
  type: AUTH_ERROR,
  payload,
});

export const removeAuthAlerts = () => ({
  type: REMOVE_AUTH_ALERT,
});

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
});

export const deleteUser = (payload) => ({
  type: REMOVE_USER,
  payload,
});

export const loginUser =
  ({ email, password }, callback) =>
  (dispatch) => {
    // console.log(email, password);
    api
      .post("/signin", { email, password })
      .then((res) => {
        setSessionCookie("user", JSON.stringify(res.data));
        setSessionCookie("token", res.data.token);
        dispatch(setAuthSuccess("User Authenticated"));
        dispatch(setLogin({ user: { email, password } }));
        if (callback) callback();
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAuthError("Authentication Failed"));
      });
  };

export const getUsers = () => (dispatch) => {
  api
    .get("/users")
    .then((res) => {
      dispatch(setUsers(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setAuthError("Get Users Failed"));
    });
};

export const removeUser =
  ({ userId }) =>
  (dispatch) => {
    api
      .delete(`/user/${userId}`)
      .then((res) => {
        console.log(res.data);
        dispatch(deleteUser(userId));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAuthError("Get Users Failed"));
      });
  };

export const promoteUser =
  ({ userId }) =>
  (dispatch) => {
    api
      .patch(`/user/promote/${userId}`)
      .then((res) => {
        console.log(res.data);
        dispatch(setUsers(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAuthError("Get Users Failed"));
      });
  };

export const demoteUser =
  ({ userId }) =>
  (dispatch) => {
    api
      .patch(`/user/demote/${userId}`)
      .then((res) => {
        console.log(res.data);
        dispatch(setUsers(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAuthError("Get Users Failed"));
      });
  };

export const logoutUser = () => async (dispatch) => {
  try {
    deleteSessionCookie("user");
    deleteSessionCookie("token");
    dispatch(setLogout());
  } catch (err) {
    console.log(err);
  }
};

export const updatePassword =
  ({ oldPassword, newPassword }, callback) =>
  (dispatch) => {
    api
      .patch("/user/update", { oldPassword, newPassword })
      .then((res) => {
        console.log(res.data);
        dispatch(setAuthSuccess("Password Changed Successfully"));
        // callback();
      })
      .catch((err) => {
        dispatch(setAuthError("Failed To Change Password"));
        console.log(err);
      });
  };

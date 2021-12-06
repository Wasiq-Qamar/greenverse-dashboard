import {
  deleteSessionCookie,
  setSessionCookie,
} from "../../../utility/session";
import api from "../../api";
import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN,
  LOGOUT,
  REMOVE_AUTH_ALERT,
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

export const createUser =
  ({ username, password, userType }) =>
  (dispatch) => {
    api
      .post("/user/create", { username, password, userType })
      .then((res) => {
        dispatch(setAuthSuccess("User Created Successfully"));
      })
      .catch((err) => {
        dispatch(setAuthError("Failed To Create User"));
        console.log(err);
      });
  };

export const loginUser =
  ({ username, password }, callback) =>
  (dispatch) => {
    // api
    //   .post("/user/login", { username, password })
    //   .then((res) => {
    //     const { token, user } = res.data;
    //     setSessionCookie("token", token);
    //     setSessionCookie("user", JSON.stringify(user));
    // dispatch(setAuthSuccess("User Authenticated"));
    dispatch(setLogin({ user: { username, password } }));
    //   callback();
    // })
    // .catch((err) => {
    //   dispatch(setAuthError("Authentication Failed"));
    //   console.log(err);
    // });
  };

export const logoutUser = () => async (dispatch) => {
  console.log("logout");
  // try {
  // dispatch(removeAuthAlerts());
  // await deleteSessionCookie("token");
  // await deleteSessionCookie("user");
  // await deleteSessionCookie("gatewaysActive");
  // await deleteSessionCookie("gatewaysInactive");
  //  console.log("TOKEN", getSessionCookie('token'))
  //  console.log("gateways", getSessionCookie('gateways'))
  dispatch(setLogout());
  // } catch (err) {
  // console.log(err);
  // }
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

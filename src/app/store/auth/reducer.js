import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN,
  LOGOUT,
  REMOVE_AUTH_ALERT,
} from "./actionTypes";

const INIT_STATE = {
  isLogin: false,
  authError: "",
  authSuccess: "",
  user: {},
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case LOGOUT:
      console.log("LOGOUT");
      return {
        ...state,
        isLogin: false,
        authError: "",
        authSuccess: "",
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authSuccess: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
      };
    case REMOVE_AUTH_ALERT:
      return {
        ...state,
        authSuccess: "",
        authError: "",
      };
    default:
      return state;
  }
};

export default Auth;

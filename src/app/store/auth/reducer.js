import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN,
  LOGOUT,
  REMOVE_AUTH_ALERT,
  SET_USERS,
  REMOVE_USER,
} from "./actionTypes";

const INIT_STATE = {
  isLogin: false,
  authError: "",
  authSuccess: "",
  user: {},
  users: [],
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
      return {
        ...state,
        isLogin: false,
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
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case REMOVE_USER:
      let usersArr = state.users.filter((item) => item._id !== action.payload);
      return {
        ...state,
        users: usersArr,
      };
    default:
      return state;
  }
};

export default Auth;

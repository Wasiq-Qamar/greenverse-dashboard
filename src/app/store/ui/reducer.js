import { ALERT } from "./actionTypes";

const INIT_STATE = {
  alert: null,
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    default:
      return state;
  }
};

export default Auth;

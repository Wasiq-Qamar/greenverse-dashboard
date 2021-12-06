import {
  GET_ACTIVE_GATEWAYS,
  GET_INACTIVE_GATEWAYS,
  GET_UNACCEPTED_KEYS,
  SET_LOADING,
  SET_LOADING_INACTIVE,
  SET_SELECTED_GATEWAYS,
  SET_SELECTED_KEYS,
} from "./actionTypes";

const INIT_STATE = {
  loading: true,
  loadingInactive: true,
  selectedGateways: [],
  activeGateways: [],
  inactiveGateways: [],
  unacceptedKeys: [],
  selectedKeys: [],
};

const Gateways = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_GATEWAYS:
      return {
        ...state,
        selectedGateways: action.payload,
      };
    case SET_SELECTED_KEYS:
      return {
        ...state,
        selectedKeys: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_LOADING_INACTIVE:
      return {
        ...state,
        loadingInactive: action.payload,
      };

    case GET_ACTIVE_GATEWAYS:
      return {
        ...state,
        activeGateways: action.payload,
      };
    case GET_INACTIVE_GATEWAYS:
      return {
        ...state,
        inactiveGateways: action.payload,
      };
    case GET_UNACCEPTED_KEYS:
      return {
        ...state,
        unacceptedKeys: action.payload,
        // inactiveGateways: action.payload.down,
      };

    default:
      return state;
  }
};

export default Gateways;

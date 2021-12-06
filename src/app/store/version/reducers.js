import {
  ADD_VERSION,
  SET_SELECTED_VERSION,
  GET_VERSION,
  DELETE_VERSION,
} from "./actionTypes";

const INIT_STATE = {
  selectedVersion: {},
  versions: [],
};

const Versions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_VERSION:
      return {
        ...state,
        selectedVersion: action.payload,
      };
    case ADD_VERSION:
      return {
        ...state,
        versions: [...state.versions, action.payload],
      };
    case DELETE_VERSION:
      return {
        ...state,
        versions: state.versions.filter(
          (version) => version._id !== action.payload
        ),
      };
    case GET_VERSION:
      return {
        ...state,
        versions: action.payload,
      };

    default:
      return state;
  }
};

export default Versions;

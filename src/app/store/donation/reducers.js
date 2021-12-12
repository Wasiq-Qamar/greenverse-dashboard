import { GET_DONATIONS } from "./actionTypes";

const INIT_STATE = {
  donations: [],
};

const Donation = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DONATIONS:
      return {
        ...state,
        donations: action.payload,
      };

    default:
      return state;
  }
};

export default Donation;

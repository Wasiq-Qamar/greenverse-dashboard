import { GET_TASKS } from "./actionTypes";

const INIT_STATE = {
  tasks: [],
};

const Task = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
};

export default Task;

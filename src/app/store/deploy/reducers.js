import {
  ADD_DEPLOY,
  SET_DEPLOYS,
  IS_DEPLOYING,
  SET_PROGRESS,
  SET_LOGS,
  REMOVE_LOGS,
  SET_SELECTED_LOG_IDS,
} from "./actionTypes";

const INIT_STATE = {
  deploys: [],
  is_deploying: false,
  progress: [],
  logs: [],
  selectedLogIds: [],
};

const Deploys = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_DEPLOY:
      return {
        ...state,
        deploys: [...state.deploys, action.payload],
      };
    case SET_DEPLOYS:
      return {
        ...state,
        deploys: action.payload,
      };
    case IS_DEPLOYING:
      return {
        ...state,
        is_deploying: action.paylaod,
      };
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case SET_LOGS:
      return {
        ...state,
        logs: action.payload,
      };
    case SET_SELECTED_LOG_IDS:
      return {
        ...state,
        selectedLogIds: action.payload,
      };
    case REMOVE_LOGS:
      console.log("REMOVE LOGS");
      let filteredLogs = state.logs.filter(
        (item) => !state.selectedLogIds.includes(item.id)
      );
      console.log(filteredLogs);
      return {
        ...state,
        logs: filteredLogs,
      };

    default:
      return state;
  }
};

export default Deploys;

import { combineReducers } from "redux";
import Auth from "./auth/reducer";
import Ui from "./ui/reducer";

const rootReducer = combineReducers({
  auth: Auth,
  ui: Ui,
});

export default rootReducer;

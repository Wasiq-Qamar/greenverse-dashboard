import { combineReducers } from "redux";
import Auth from "./auth/reducer";
import Ui from "./ui/reducer";
import Donation from "./donation/reducers";
import Order from "./order/reducers";
import Task from "./task/reducers";

const rootReducer = combineReducers({
  auth: Auth,
  ui: Ui,
  donation: Donation,
  order: Order,
  task: Task,
});

export default rootReducer;

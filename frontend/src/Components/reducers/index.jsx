import { combineReducers } from "redux";
import CheckDeleteReducer from "./CheckDelete/CheckDelete";
import ComponentImagePostReducer from "./ComponentsPost/ComponentPost";
export default combineReducers({
  CheckDeleteReducer,
  ComponentImagePostReducer,
});

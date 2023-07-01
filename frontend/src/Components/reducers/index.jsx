import { combineReducers } from "redux";
import CheckDeleteReducer from "./CheckDelete/CheckDelete";
import ComponentImagePostReducer from "./ComponentsPost/ComponentPost";
import CheckMyPostReducer from "./PostReducer/PostCheck";
export default combineReducers({
  CheckDeleteReducer,
  ComponentImagePostReducer,
  CheckMyPostReducer,
});

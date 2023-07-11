import { combineReducers } from "redux";
import CheckDeleteReducer from "./CheckDelete/CheckDelete";
import ComponentImagePostReducer from "./ComponentsPost/ComponentPost";
import CheckMyPostReducer from "./PostReducer/PostCheck";
import PostReducer from "./PosttRdc/PostRdc";
export default combineReducers({
  CheckDeleteReducer,
  ComponentImagePostReducer,
  CheckMyPostReducer,
  PostReducer,
});

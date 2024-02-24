// import { combineReducers } from "redux";
// import CheckDeleteReducer from "./CheckDelete/CheckDelete";
// import ComponentImagePostReducer from "./ComponentsPost/ComponentPost";
// import CheckMyPostReducer from "./PostReducer/PostCheck";
// import PostReducer from "./CheckSize/CheckSize";
// export default combineReducers({
//   CheckDeleteReducer,
//   ComponentImagePostReducer,
//   CheckMyPostReducer,
//   PostReducer,
// });

import { configureStore } from "@reduxjs/toolkit";
import checkReducer from "./CheckReducer/Check";
import ImageReducer from "./ImageReducer/imageReduce";
import IconReducer from "./IconReducer/Icon_Component";
export const store = configureStore({
  reducer: {
    check: checkReducer,
    images: ImageReducer,
    icons: IconReducer,
  },
  devTools: true,
});

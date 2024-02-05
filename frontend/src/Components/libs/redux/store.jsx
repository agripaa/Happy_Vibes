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

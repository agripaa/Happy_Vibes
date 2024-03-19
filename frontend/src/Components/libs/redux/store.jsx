import { configureStore } from "@reduxjs/toolkit";
import checkReducer from "./CheckReducer/Check";
import ImageReducer from "./ImageReducer/imageReduce";
import IconReducer from "./IconReducer/Icon_Component";
import StoryReducer from "./StoryReducer/StoryReducer";
export const store = configureStore({
  reducer: {
    check: checkReducer,
    images: ImageReducer,
    icons: IconReducer,
    story: StoryReducer,
  },
  devTools: true,
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textStory: {
    bgColor: "",
    fontWeight: "",
  },
  imageStory: {
    image: "",
    aspectRatio: "",
  },
};

const StoryReducer = createSlice({
  name: "story",
  initialState,
  reducers: {
    setTextStoryinBgColor(state, action) {
      state.textStory.bgColor = action.payload;
    },
    setTextStoryinFontWeight(state, action) {
      state.textStory.fontWeight = action.payload;
    },
    ResetStoryTextAndImage(state) {
      state.textStory.bgColor = "";
      state.textStory.fontWeight = "";
      state.imageStory.image = "";
      state.imageStory.aspectRatio = "";
    },
    setUploadImage(state, action) {
      state.imageStory = action.payload;
    },
  },
});

export const {
  setTextStoryinText,
  setTextStoryinBgColor,
  setTextStoryinFontWeight,
  setUploadImage,
  ResetStoryTextAndImage,
} = StoryReducer.actions;
export default StoryReducer.reducer;

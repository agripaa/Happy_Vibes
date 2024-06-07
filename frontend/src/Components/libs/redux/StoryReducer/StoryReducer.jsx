import { createSlice } from "@reduxjs/toolkit";
import ImageDummys from "@icons/ImageDummy2.png";
import ImageDummys2 from "@icons/Img-1.png";
const initialState = {
  textStory: {
    bgColor: "",
    fontWeight: "",
  },
  imageStory: {
    image: "",
    aspectRatio: "",
  },
  SlideStories: [
    {
      id: "1",
      name: "syahroni",
      stories: [
        {
          type: "image",
          image: ImageDummys,
          text: "ini adalah text story Image 1",
          aspectRatio: "",

          time: "",
        },
        {
          type: "image",
          image: ImageDummys2,
          text: "ini adalah text story Image 2",
          aspectRatio: "",

          time: "",
        },
        {
          type: "image",
          image: ImageDummys,
          text: "ini adalah text story Image 3",
          aspectRatio: "",

          time: "",
        },
        {
          type: "image",
          image: ImageDummys2,
          text: "ini adalah text story Image 4",
          aspectRatio: "",

          time: "",
        },
      ],
    },
    {
      id: "2",
      name: "syahron",
      stories: [
        {
          type: "image",
          image: ImageDummys,
          text: "ini adalah text story Image 1",
          aspectRatio: "",
          time: "",
        },
        {
          type: "image",
          image: ImageDummys2,
          text: "ini adalah text story Image 2",
          aspectRatio: "",

          time: "",
        },
        {
          type: "image",
          image: ImageDummys,
          text: "ini adalah text story Image 3",
          aspectRatio: "",

          time: "",
        },
        {
          type: "image",
          image: ImageDummys2,
          text: "ini adalah text story Image 4",
          aspectRatio: "",

          time: "",
        },
        {
          type: "text",
          bgColor: "pink",
          text: "ini adalah text story Image 4",
          fontWeight: "600",
          time: "",
        },
      ],
    },
    {
      id: "3",
      name: "Bang Ons",
      stories: [
        {
          type: "image",
          image: ImageDummys,
          text: "ini adalah text story Image 1",
          aspectRatio: "",
          time: "",
        },
        {
          type: "image",
          image: ImageDummys2,
          text: "ini adalah text story Image 2",
          aspectRatio: "",

          time: "",
        },
        {
          type: "image",
          image: ImageDummys,
          text: "ini adalah text story Image 3",
          aspectRatio: "",

          time: "",
        },
        {
          type: "image",
          image: ImageDummys2,
          text: "ini adalah text story Image 4",
          aspectRatio: "",

          time: "",
        },
        {
          type: "text",
          bgColor: "pink",
          text: "ini adalah text story Image 4",
          fontWeight: "600",
          time: "",
        },
      ],
    },
  ],
  ChangeStories: false,
  countSlideStories: 0,
  indexContentStories: 0,
  autoPlay: false,
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
    setChangeStoriesSlide: (state, action) => {
      state.ChangeStories = action.payload;
    },
    nextBarStories: (state, action) => {
      if (action.payload === "next") {
        state.countSlideStories += 1;
      } else {
        state.countSlideStories = 0;
      }
    },
    prevBarStories: (state, action) => {
      if (action.payload === "prev") {
        state.countSlideStories -= 1;
      } else {
        state.countSlideStories = 0;
      }
    },
    nextIndexContentStories: (state, action) => {
      if (action.payload === "done") {
        state.indexContentStories = 0;
      } else {
        state.indexContentStories += 1;
      }
    },
    prevIndexContentStories: (state, action) => {
      if (action.payload === "done") {
        state.indexContentStories = 0;
      } else {
        state.indexContentStories -= 1;
      }
    },
    PlayAndPauseStory: (state, action) => {
      state.autoPlay = action.payload;
    },
  },
});

export const {
  setTextStoryinText,
  setTextStoryinBgColor,
  setTextStoryinFontWeight,
  setUploadImage,
  ResetStoryTextAndImage,
  setChangeStoriesSlide,
  nextBarStories,
  prevBarStories,
  nextIndexContentStories,
  prevIndexContentStories,
  PlayAndPauseStory,
} = StoryReducer.actions;
export default StoryReducer.reducer;

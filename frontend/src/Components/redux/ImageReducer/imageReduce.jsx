import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  getwidth: innerWidth,
  getImage: null,
  getFileImage: null,
  getCredentialImage: {},
};

const ImageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    HandleGetWidth: (state, action) => {
      state.getwidth = action.payload;
    },
    HandleSaveImage: (state, action) => {
      state.getImage = action.payload;
    },
    HandleFileImage: (state, action) => {
      state.getFileImage = action.payload;
    },
    HandleSaveCredential: (state, action) => {
      state.getCredentialImage = action.payload;
    },
  },
});
export const {
  HandleGetWidth,
  HandleSaveImage,
  HandleFileImage,
  HandleSaveCredential,
} = ImageSlice.actions;
export default ImageSlice.reducer;

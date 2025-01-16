import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loading",
  initialState: { isLoading: false },
  reducers: {
    showLoader: (state, action) => {
      return { isLoading: true };
    },
    hideLoader: (state, action) => {
      return { isLoading: false };
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;

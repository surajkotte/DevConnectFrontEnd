import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduxSlice/userSlice";
import loaderSlice from "../reduxSlice/loaderSlice";
const Store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderSlice,
  },
});

export default Store;

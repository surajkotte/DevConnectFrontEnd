import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduxSlice/userSlice";
import loaderSlice from "../reduxSlice/loaderSlice";
import ToastSlice from "../reduxSlice/ToastSlice";
const Store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderSlice,
    toast: ToastSlice,
  },
});

export default Store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduxSlice/userSlice";
import loaderSlice from "../reduxSlice/loaderSlice";
import ToastSlice from "../reduxSlice/ToastSlice";
import modalSlice from "../reduxSlice/modalSlice";
const Store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderSlice,
    toast: ToastSlice,
    modal: modalSlice,
  },
});

export default Store;

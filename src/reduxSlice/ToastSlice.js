import { createSlice } from "@reduxjs/toolkit";

const ToastSlice = createSlice({
  name: "toast",
  initialState: { message: null, messageType: null },
  reducers: {
    addToast: (state, action) => {
      return {
        message: action.payload?.message,
        messageType: action.payload?.messageType,
      };
    },
    clearToast: (state, action) => {
      return { message: null, messageType: null };
    },
  },
});

export const { addToast, clearToast } = ToastSlice.actions;
export default ToastSlice.reducer;

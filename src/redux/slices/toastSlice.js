import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    message: "",
    type: "success", // success | error | info
    visible: false,
  },
  reducers: {
    showToast(state, action) {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type || "success";
      state.visible = true;
    },
    hideToast(state) {
      state.visible = false;
      state.message = "";
      state.type = "success";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;

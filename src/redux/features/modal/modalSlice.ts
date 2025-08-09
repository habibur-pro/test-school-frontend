import { createSlice } from "@reduxjs/toolkit";

export interface NavbarState {
  isOpen: boolean;
}

const initialState: NavbarState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "registerModal",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = modalSlice.actions;

export default modalSlice.reducer;

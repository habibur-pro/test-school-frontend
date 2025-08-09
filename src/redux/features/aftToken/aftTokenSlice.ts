import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type TAftToken = {
  aftToken?: string | null;
};

const initialState: TAftToken = {
  aftToken: "",
};

const aftTokenSlice = createSlice({
  name: "challengeConfig",
  initialState,
  reducers: {
    resetAftToken: (state) => {
      state.aftToken = "";
    },
    setAftToken: (state, action: PayloadAction<string>) => {
      state.aftToken = action.payload;
    },
  },
});
export const { setAftToken, resetAftToken } = aftTokenSlice.actions;
export default aftTokenSlice.reducer;

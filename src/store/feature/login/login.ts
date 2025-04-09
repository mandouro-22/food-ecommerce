// src/store/loginSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  userId: string | null;
}

const initialState: LoginState = {
  userId: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<LoginState>) => {
      state.userId = action.payload.userId;
    },
  },
});

export const { setLoginData } = loginSlice.actions;
export default loginSlice.reducer;

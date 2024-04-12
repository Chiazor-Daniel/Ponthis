import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  userToken: localStorage.getItem("token") || null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateState(state, action) {
      state.userInfo = action.payload
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.userToken = action.payload.userToken;
      state.success = true;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    logout(state) {
      state.userInfo = null;
      state.userToken = null;
      state.success = false;
    },
    clearState(state) {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateState, clearState } = authSlice.actions;
export default authSlice.reducer;

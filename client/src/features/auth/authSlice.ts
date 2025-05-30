/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

type stateType = {
  loginLoading: boolean;
  loginResponse: any;
  logoutLoading: boolean;
  logoutResponse: any;
};

const initialState: stateType = {
  loginLoading: false,
  loginResponse: null,
  logoutLoading: false,
  logoutResponse: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, _payload) {
      state.loginLoading = true;
    },
    loginSuccess(state) {
      state.loginLoading = false;
    },
    loginFailure(state) {
      state.loginLoading = false;
    },
    logout(state, _action) {
      state.logoutLoading = true;
    },
    logoutSuccess(state) {
      state.logoutLoading = false;
    },
    logoutFailure(state) {
      state.logoutLoading = false;
    }
  }
});

const { actions, reducer } = authSlice;

export { actions as authActions, reducer as authReducer };

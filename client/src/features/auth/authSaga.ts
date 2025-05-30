/* eslint-disable @typescript-eslint/no-unused-vars */
import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi } from '~/features/auth/authApi';
import { authActions } from '~/features/auth/authSlice';
import { LoginRequest } from '~/pages/LoginPage';
import { showToast } from '~/utils/notification';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ActionTye {
  type: string;
  payload: any;
}

export type LoginType = {
  type: string;
  payload: { values: LoginRequest; onSuccess: () => void };
};

export type LogoutType = {
  type: string;
  payload: { onSuccess: () => void };
};
export function* loginWorker(payload: ActionTye): Generator {
  try {
    const response = yield call(authApi.login, payload.payload);
    yield put(authActions.loginSuccess());
  } catch (error) {
    yield put(authActions.loginFailure());
  }
}

export function* logoutWorker(action: LogoutType): Generator {
  try {
    const response = yield call(authApi.logout);
    action.payload.onSuccess();
    showToast('Logout success', 'success');
  } catch (error) {
    yield put(authActions.loginFailure());
  }
}

export const authWatcher = [
  takeEvery(authActions.login, loginWorker),
  takeEvery(authActions.logout, logoutWorker)
];

import { all } from 'redux-saga/effects';
import { blogWatcher } from '../features/blog/blogSaga';
import { authWatcher } from '~/features/auth/authSaga';

export function* rootSaga() {
  yield all([...blogWatcher, ...authWatcher]);
}

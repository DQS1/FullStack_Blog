import { all } from 'redux-saga/effects';
import { blogWatcher } from '../features/blog/blogSaga';

export function* rootSaga() {
  yield all([...blogWatcher]);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { call, put, takeEvery } from 'redux-saga/effects';
import { blogApi } from './blogAip';
import { blogActions } from './blogSlice';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ActionType {
  type: string;
  payload: any;
}

export function* getAllBlogWorker(): Generator {
  try {
    const response = yield call(blogApi.getAllBlog);
    yield put(blogActions.getAllBlogSuccess(response));
  } catch (error) {
    // showErrorNotification("Get User failure!");
    yield put(blogActions.getAllBlogFailure());
  }
}

export function* createBlogWorker({ payload }: ActionType): Generator {
  try {
    const response = yield call(blogApi.createBlog, payload);
    yield put(blogActions.createBlogSuccess(response));
  } catch (error) {
    // showErrorNotification("Get User failure!");
    yield put(blogActions.createBlogFailure());
  }
}

export function* updateBlogWorker({ payload }: ActionType): Generator {
  try {
    const response = yield call(blogApi.updateBlog, payload);
    yield put(blogActions.updateBlogSuccess(response));
  } catch (error) {
    // showErrorNotification("Get User failure!");
    yield put(blogActions.updateBlogFailure());
  }
}

export const blogWatcher = [
  takeEvery(blogActions.getAllBlog, getAllBlogWorker),
  takeEvery(blogActions.createBlog, createBlogWorker),
  takeEvery(blogActions.updateBlog, updateBlogWorker)
];

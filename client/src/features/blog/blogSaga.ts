/* eslint-disable @typescript-eslint/no-unused-vars */
import { call, put, takeEvery } from 'redux-saga/effects';
import { showToast } from '~/utils/notification';
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
  console.log('🚀 ~ function*createBlogWorker ~ payload:', payload);
  try {
    const response = yield call(blogApi.createBlog, payload.formData);
    if (response.status == 200) {
      yield put(blogActions.createBlogSuccess(response));
      payload.onSuccess();
      showToast('Create success', 'success');
    }
  } catch (error) {
    // showErrorNotification("Get User failure!");
    yield put(blogActions.createBlogFailure());
    showToast(`Create failure: ${error}`, 'error');
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

export function* deleteBlogWorker({ payload }: ActionType): Generator {
  try {
    const response = yield call(blogApi.deleteBlog, payload.id);
    if (response.status == 200) {
      yield put(blogActions.deleteBlogSuccess(response));
      payload.onSuccess();
      showToast('Delete success', 'success');
    }
  } catch (error) {
    yield put(blogActions.deleteBlogFailure());
    showToast(`Delete failure: ${error}`, 'error');
  }
}

export const blogWatcher = [
  takeEvery(blogActions.getAllBlog, getAllBlogWorker),
  takeEvery(blogActions.createBlog, createBlogWorker),
  takeEvery(blogActions.updateBlog, updateBlogWorker),
  takeEvery(blogActions.deleteBlog, deleteBlogWorker)
];

/* eslint-disable @typescript-eslint/no-unused-vars */
import { call, put, takeEvery } from 'redux-saga/effects';
import { showToast } from '~/utils/notification';
import { blogApi } from './blogApi';
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
    yield put(blogActions.getAllBlogFailure());
  }
}

export function* createBlogWorker({ payload }: ActionType): Generator {
  try {
    const response = yield call(blogApi.createBlog, payload.formData);
    if (response.status == 200) {
      yield put(blogActions.createBlogSuccess(response));
      payload.onSuccess();
      showToast('Create success', 'success');
    }
  } catch (error) {
    yield put(blogActions.createBlogFailure());
    showToast(`Create failure: ${error}`, 'error');
  }
}

export function* updateBlogWorker({ payload }: ActionType): Generator {
  try {
    const response = yield call(blogApi.updateBlog, payload);
    if (response.status == 200) {
      yield put(blogActions.updateBlogSuccess(response));
      payload.onSuccess();
      showToast('Update success', 'success');
    }
  } catch (error) {
    console.log('🚀 ~ function*updateBlogWorker ~ error:', error);
    yield put(blogActions.updateBlogFailure());
    showToast(`Update failure: ${error}`, 'error');
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

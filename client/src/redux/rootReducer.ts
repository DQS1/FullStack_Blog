import { authWatcher } from '~/features/auth/authSaga';
import { blogReducer } from '../features/blog/blogSlice';

export const rootReducer = {
  auth: authWatcher,
  blog: blogReducer
};

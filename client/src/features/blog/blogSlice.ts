/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable @typescript-eslint/no-explicit-any */
type stateType = {
  getAllBlogLoading: boolean;
  getAllBlogResponse: any;
  createBlogLoading: boolean;
  createBlogResponse: any;
  updateBlogLoading: boolean;
  updateBlogResponse: any;
};

const initialState: stateType = {
  getAllBlogLoading: false,
  getAllBlogResponse: null,
  createBlogLoading: false,
  createBlogResponse: null,
  updateBlogLoading: false,
  updateBlogResponse: null
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getAllBlog(state) {
      state.createBlogLoading = true;
    },
    getAllBlogSuccess(state, { payload }) {
      state.createBlogLoading = false;
      state.createBlogResponse = payload.data;
    },
    getAllBlogFailure(state) {
      state.createBlogLoading = false;
    },
    createBlog(state, _payload) {
      state.createBlogLoading = true;
    },
    createBlogSuccess(state, { payload }) {
      state.createBlogLoading = false;
      state.createBlogResponse = payload.data;
    },
    createBlogFailure(state) {
      state.createBlogLoading = false;
    },
    updateBlog(state, _payload) {
      state.updateBlogLoading = true;
    },
    updateBlogSuccess(state, { payload }) {
      state.updateBlogLoading = false;
      state.updateBlogResponse = payload.data;
    },
    updateBlogFailure(state) {
      state.updateBlogLoading = false;
    }
  }
});

const { reducer, actions } = blogSlice;

export { reducer as blogReducer, actions as blogActions };

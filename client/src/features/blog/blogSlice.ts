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
  deleteBlogLoading: boolean;
  deleteBlogResponse: any;
};

const initialState: stateType = {
  getAllBlogLoading: false,
  getAllBlogResponse: null,
  createBlogLoading: false,
  createBlogResponse: null,
  updateBlogLoading: false,
  updateBlogResponse: null,
  deleteBlogLoading: false,
  deleteBlogResponse: null
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getAllBlog(state) {
      state.getAllBlogLoading = true;
    },
    getAllBlogSuccess(state, { payload }) {
      state.getAllBlogLoading = false;
      state.getAllBlogResponse = payload.data;
    },
    getAllBlogFailure(state) {
      state.getAllBlogResponse = false;
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
    },
    deleteBlog(state, _payload) {
      state.deleteBlogLoading = true;
    },
    deleteBlogSuccess(state, { payload }) {
      state.deleteBlogLoading = false;
      state.deleteBlogResponse = payload.data;
    },
    deleteBlogFailure(state) {
      state.deleteBlogLoading = false;
    }
  }
});

const { reducer, actions } = blogSlice;

export { reducer as blogReducer, actions as blogActions };

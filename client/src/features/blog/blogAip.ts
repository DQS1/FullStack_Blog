/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../config/axios.config';

const blogApi = {
  getAllBlog: async (): Promise<AxiosResponse<any, any>> => {
    const response: AxiosResponse = await axiosInstance.get<any>('/blog');
    return response;
  },
  createBlog: async (payload: any): Promise<AxiosResponse<any, any>> => {
    const response: AxiosResponse = await axiosInstance.post<any>(
      '/create',
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response;
  },
  updateBlog: async (payload: any): Promise<AxiosResponse<any, any>> => {
    const response: AxiosResponse = await axiosInstance.post<any>('/', payload);
    return response;
  },
  deleteBlog: async (payload: any): Promise<AxiosResponse<any, any>> => {
    console.log('🚀 ~ deleteBlog: ~ payload:', payload);
    const response: AxiosResponse = await axiosInstance.delete<any>(
      `/delete/${payload}`
    );
    return response;
  }
};

export { blogApi };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { axiosInstance } from '~/config/axios.config';
const authApi = {
  login: async (payload: any): Promise<AxiosResponse<any, any>> => {
    const url = '/auth/login';
    const response: AxiosResponse = await axiosInstance.post(url, payload);
    return response;
  },
  check: async (): Promise<AxiosResponse<any, any>> => {
    console.log('🚀 ~ check: ~ check:');
    const url = '/auth/check';
    const response: AxiosResponse = await axiosInstance.get(url);
    return response;
  },
  logout: async (): Promise<AxiosResponse<any, any>> => {
    const url = '/auth/logout';
    const response: AxiosResponse = await axiosInstance.post(url);
    return response;
  }
};

export { authApi };

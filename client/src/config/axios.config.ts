import axios from 'axios';

const URL = 'http://localhost:5000';

export const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Expose-Headers': 'x-pagination, Access-Token, Uid'
  }
});

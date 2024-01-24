import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: '/api/', // 替换为你的 API 基础 URL
  timeout: 2500, // 请求超时时间
  headers: { 'Content-Type': 'application/json' }, // 根据需求设置全局请求头
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    
    return config;
  },
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 处理响应数据
    return response.data; // 可以在这里直接返回 response.data，以简化每个请求的返回处理
  },
  error => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default axiosInstance;

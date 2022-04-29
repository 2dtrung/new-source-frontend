import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import { useNotificationStore } from '@/stores/notifications';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVkNDhlYWY0YmFmZTAwMWM2M2Y4YzciLCJwYXNzd29yZCI6IiQyYiQxMCRKZkQuQ0tCd1lJVXFoUnNjdEtDWVZlS211QVBLQ2ExNVZULkF5THRpOE5DS1hMS2xUYmM1MiIsImlhdCI6MTY1MDg3MTg0OH0.iOITYE4NX37tmfvCE373RjGoWZed_HHEQ6gYRh1XfX4';

  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  }
);

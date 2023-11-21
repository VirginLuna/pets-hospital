import { message } from 'antd';
import Axios from 'axios';
import { useEffect, useMemo } from 'react';

const defaultConfig = {
  baseURL: process.env.NODE_ENV === 'development' ? 'http://rap2api.taobao.org/app/mock/315227' : location.origin,
};

const http = Axios.create(defaultConfig);

export default http;

/**
 * 发送请求，如果请求未完成而销毁组件，则取消请求
 */
export function useHttp() {
  const abortFnsMap: { [key: string]: () => void } = useMemo(() => {
    return {};
  }, []);

  const [messageApi] = message.useMessage();

  const http = useMemo(() => {
    const instance = Axios.create(defaultConfig);

    instance.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem('accessToken');

        const controller = new AbortController();
        // @ts-expect-error ignore
        const requestId = (config.__id__ = Math.random().toString());
        abortFnsMap[requestId] = controller.abort.bind(controller);
        config.signal = controller.signal;
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      function (error) {
        if (Axios.isAxiosError(error)) {
          // @ts-expect-error ignore
          const requestId = error.config.__id__;
          if (requestId) {
            delete abortFnsMap[requestId];
          }
        }
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    instance.interceptors.response.use(
      function (response) {
        // @ts-expect-error ignore
        const requestId = response.config.__id__;

        if (requestId) {
          delete abortFnsMap[requestId];
        }

        return response;
      },
      function (error) {
        if (Axios.isAxiosError(error)) {
          const data = error.response?.data ?? error.message;
          const message = typeof data === 'object' ? (data as any).err : data;

          if (!Axios.isCancel(error)) {
            messageApi.open({
              content: message,
              type: 'error',
            });
          }

          // @ts-expect-error ignore
          const requestId = error.config.__id__;
          if (requestId) {
            delete abortFnsMap[requestId];
          }
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );

    return instance;
  }, []);

  useEffect(() => {
    return () => {
      for (const id in abortFnsMap) {
        const abortFn = abortFnsMap[id];

        abortFn();
      }
    };
  }, []);

  return http;
}

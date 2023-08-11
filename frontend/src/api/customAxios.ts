import axios, { AxiosRequestConfig } from "axios";

export const BASE_URL =
  "http://ec2-54-180-217-241.ap-northeast-2.compute.amazonaws.com:8080/api/v1";

const instance = axios.create({
  baseURL: BASE_URL,
});

const mockToken = "ff";

const customAxios = {
  get: (url: string, options?: AxiosRequestConfig) => {
    return instance.get(url, {
      ...options,
    });
  },
  post: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance.post(url, data, {
      ...options,

      // headers: {
      //   Authorization: `Bearer ${mockToken}`,
      //   ...options!.headers,
      // },
    });
  },

  patch: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance.patch(url, data, {
      ...options,

      // headers: {
      //   Authorization: `Bearer ${mockToken}`,
      //   ...options!.headers,
      // },
    });
  },

  delete: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance.post(url, {
      ...options,
      // headers: {
      //   Authorization: `Bearer ${mockToken}`,
      //   ...options!.headers,
      // },
    });
  },
  put: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance.post(url, data, {
      ...options,
      // headers: {
      //   Authorization: `Bearer ${mockToken}`,
      //   ...options!.headers,
      // },
    });
  },
};

export default customAxios;

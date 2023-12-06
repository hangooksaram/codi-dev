import { getTokenFormLocalStorage } from "@/utils/auth";
import axios, { AxiosRequestConfig } from "axios";

export const BASE_URL =
  "http://ec2-54-180-217-241.ap-northeast-2.compute.amazonaws.com:8080/api/v1";

const instance = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: getTokenFormLocalStorage()?.access.value
        ? getTokenFormLocalStorage()?.access.value
        : "",
    },
  });
};

const customAxios = {
  get: (url: string, options?: AxiosRequestConfig) => {
    return instance().get(url, {
      ...options,
    });
  },
  post: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance().post(url, data, {
      ...options,
    });
  },

  patch: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance().patch(url, data, {
      ...options,
    });
  },

  delete: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance().delete(url, {
      ...options,
    });
  },
  put: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance().post(url, data, {
      ...options,
    });
  },
};

export default customAxios;

import axios from "axios";

export const BASE_URL =
  "http://ec2-54-180-217-241.ap-northeast-2.compute.amazonaws.com:8080/api/v1";

const instance = axios.create({
  baseURL: BASE_URL,
});

const mockToken = "ff";

interface AxiosOptions {
  headers: {};
}

const customAxios = {
  get: (url: string, options?: AxiosOptions) => {
    return instance.get(url, {
      ...options,
    });
  },
  post: (url: string, data?: object, options?: AxiosOptions) => {
    return instance.post(url, data, {
      ...options,

      // headers: {
      //   Authorization: `Bearer ${mockToken}`,
      //   ...options!.headers,
      // },
    });
  },

  delete: (url: string, data?: object, options?: AxiosOptions) => {
    return instance.post(url, {
      ...options,
      // headers: {
      //   Authorization: `Bearer ${mockToken}`,
      //   ...options!.headers,
      // },
    });
  },
  put: (url: string, data?: object, options?: AxiosOptions) => {
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

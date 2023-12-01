import { AxiosResponseHeaders } from "axios";
const authorizationKey = "authorization";
const localAuthorizationKey = "signin-token";

export const getToken = (headers: AxiosResponseHeaders): string => {
  if (authorizationKey in headers) {
    return headers[authorizationKey] as string;
  }
  return "token is not received";
};

export const setTokenToLocalStorage = (token: string) => {
  // if (localStorage.getItem(localAuthorizationKey)) {
  //   return;
  // }

  localStorage.setItem(localAuthorizationKey, token);
};

export const getTokenFormLocalStorage = () => {
  return localStorage.getItem(localAuthorizationKey)!;
};

import { Token } from "@/types/user";
import { AxiosResponseHeaders } from "axios";
const accessTokenKeyName = "authorization";
const refreshTokenKeyName = "refresh";

const localAuthorizationKey = "signin-token";

export const getToken = (headers: AxiosResponseHeaders): Token | undefined => {
  if (accessTokenKeyName in headers && refreshTokenKeyName in headers) {
    return {
      access: { value: headers[accessTokenKeyName] as string, expiredTime: 0 },
      refresh: {
        value: headers[refreshTokenKeyName] as string,
        expiredTime: 0,
      },
    };
  }
  return undefined;
};

export const setTokenToLocalStorage = (token: Token) => {
  localStorage.setItem(localAuthorizationKey, JSON.stringify(token));
};

export const getTokenFormLocalStorage = (): Token | undefined => {
  return JSON.parse(localStorage.getItem(localAuthorizationKey)!);
};

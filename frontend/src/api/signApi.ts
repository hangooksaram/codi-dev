import axios, {
  AxiosError,
  AxiosResponse,
  AxiosResponseHeaders,
  isAxiosError,
} from "axios";

import customAxios from "./customAxios";
import { handleApiError } from "@/utils/api";
import { CommonApiResponse } from "@/types/api/common";
import { SignInBody, SignUpBody, UpdatePasswordBody } from "@/types/api/sign";
import { getToken, setTokenToLocalStorage } from "@/utils/auth";

export const signUp = async (
  SignUpBody: SignUpBody
): Promise<CommonApiResponse> => {
  try {
    const { status } = await customAxios.post(`/members/signup`, SignUpBody);
    return { status };
  } catch (e: unknown) {
    return handleApiError(e);
  }
};

export const signIn = async (
  SignInBody: SignInBody
): Promise<CommonApiResponse> => {
  try {
    const res = await customAxios.post(`/auth/login`, SignInBody);
    const { data, status } = res;
    setTokenToLocalStorage(getToken(res.headers as AxiosResponseHeaders)!);
    return { data, status };
  } catch (e: unknown) {
    return handleApiError(e);
  }
};
export const checkDuplicateId = async <T>(
  id: string
): Promise<CommonApiResponse<T>> => {
  try {
    const { data, status }: AxiosResponse<T> = await customAxios.get(
      `/account/validate-id?id=${id}`
    );
    return { data, status };
  } catch (e: unknown) {
    return handleApiError(e);
  }
};
export const searchUniv = async () => {
  const URL =
    "https://career.go.kr/cnet/openapi/getOpenApi?apiKey=5ae9204a5c24d7c8d88317b2e1135255&svcType=api&svcCode=SCHOOL&contentType=json&gubun=elem_list";

  return await customAxios.get(URL);
};

export const updatePassword = async (
  memberId: string,
  passwordInfo: UpdatePasswordBody
): Promise<CommonApiResponse> => {
  try {
    const { data, status } = await customAxios.patch(
      `/members/${memberId}`,
      passwordInfo
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const findId = async (email: string): Promise<CommonApiResponse> => {
  try {
    const { data, status } = await customAxios.post(`/account/find-id`, {
      email,
    });
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const findPassword = async (
  email: string,
  id: string
): Promise<CommonApiResponse> => {
  try {
    const { data, status } = await customAxios.post(`/account/find-pw`, {
      email,
      id,
    });
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

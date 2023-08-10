import axios, { AxiosResponse } from "axios";

import customAxios from "./customAxios";
import { handleApiError } from "@/utils/api";
import { CommonApiResponse } from "@/types/api/common";
import { SignInBody, SignUpBody } from "@/types/api/sign";

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

export const signIn = async (SignInBody: SignInBody) => {
  try {
    const { data, status } = await customAxios.post(`/signin`, SignInBody);
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

import axios from "axios";
import { SignUpData, SignInData } from "@/types/sign";
import customAxios from "./customAxios";
import { handleApiError } from "@/utils/api";
import { CommonApiResponse } from "@/types/apiCommon";

const signUp = async (signUpData: SignUpData): Promise<CommonApiResponse> => {
  try {
    const { status } = await customAxios.post(`/members/signup`, signUpData);
    return { status };
  } catch (e: unknown) {
    return handleApiError(e);
  }
};

const signIn = async (signInData: SignInData) => {
  try {
  } catch (e: unknown) {}
};
const checkDuplicateId = async (id: string): Promise<CommonApiResponse> => {
  try {
    const { data, status } = await customAxios.get(
      `/account/validate-id?id=${id}`
    );
    return { data, status };
  } catch (e: unknown) {
    return handleApiError(e);
  }
};
const searchUniv = async () => {
  const URL =
    "https://career.go.kr/cnet/openapi/getOpenApi?apiKey=5ae9204a5c24d7c8d88317b2e1135255&svcType=api&svcCode=SCHOOL&contentType=json&gubun=elem_list";

  return await customAxios.get(URL);
};

export { signIn, signUp, checkDuplicateId, searchUniv };

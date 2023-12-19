import { handleApiError } from "@/utils/api";
import customAxios from "./customAxios";
import { CommonApiResponse } from "@/types/api/common";
import { AxiosResponse, AxiosResponseHeaders } from "axios";
import { getToken, setTokenToLocalStorage } from "@/utils/auth";

export const registerProfile = async <T>(
  profile: FormData
): Promise<CommonApiResponse<T>> => {
  try {
    const { data, status, headers }: AxiosResponse<T> = await customAxios.post(
      `/profiles`,
      profile,
      {
        headers: {
          "Content-Type": "multitype/form-data",
        },
      }
    );
    setTokenToLocalStorage(getToken(headers as AxiosResponseHeaders)!);
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const editProfile = async <T>(
  profile: FormData
): Promise<CommonApiResponse<T>> => {
  try {
    const { data, status }: AxiosResponse<T> = await customAxios.patch(
      `/profiles/`,
      profile,
      {
        headers: {
          "Content-Type": "multitype/form-data",
        },
      }
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const getProfile = async (profileId?: string) => {
  return (await customAxios.get(`/profiles/${profileId ?? ""}`)).data!;
};

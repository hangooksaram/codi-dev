import { handleApiError } from "@/utils/api";
import customAxios from "./customAxios";
import { CommonApiResponse } from "@/types/api/common";
import { AxiosResponse } from "axios";

const registerProfile = async <T>(
  memberId: string,
  profile: FormData
): Promise<CommonApiResponse<T>> => {
  try {
    const { data, status }: AxiosResponse<T> = await customAxios.post(
      `/profiles/${memberId}`,
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

const getProfile = async <T>(id: string): Promise<CommonApiResponse<T>> => {
  try {
    const { status } = await customAxios.post(`/profiles/dhguswo555`);

    return { status };
  } catch (e) {
    return handleApiError(e);
  }
};

export { registerProfile, getProfile };

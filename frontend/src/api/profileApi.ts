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

const getProfile = async (profileId: number) => {
  return (await customAxios.get(`/profiles/${profileId}`)).data!;
};

export { registerProfile, getProfile };

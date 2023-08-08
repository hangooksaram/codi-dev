import { handleApiError } from "@/utils/api";
import customAxios from "./customAxios";
import { CommonApiResponse } from "@/types/api/common";

const registerProfile = async <T>(
  profile: FormData
): Promise<CommonApiResponse<T>> => {
  try {
    const { status } = await customAxios.post(`/profiles/dhguswo555`, profile, {
      headers: {
        "Content-Type": "multitype/form-data",
      },
    });

    return { status };
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

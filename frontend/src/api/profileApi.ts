import { handleApiError } from "@/utils/api";
import customAxios from "./customAxios";
import { CommonApiResponse } from "@/types/api/common";

const registerProfile = async (
  profile: FormData
): Promise<CommonApiResponse> => {
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

const getProfile = async (id: string): Promise<CommonApiResponse> => {
  try {
    const { status } = await customAxios.post(`/profiles/dhguswo555`);

    return { status };
  } catch (e) {
    return handleApiError(e);
  }
};

export { registerProfile, getProfile };

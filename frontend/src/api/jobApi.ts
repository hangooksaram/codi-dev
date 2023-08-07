import { CommonApiResponse } from "@/types/api/common";
import customAxios from "./customAxios";
import { handleApiError } from "@/utils/api";

export const getJobCategories = async (): Promise<CommonApiResponse> => {
  try {
    const { data, status } = await customAxios.get(`/job-categories`);
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

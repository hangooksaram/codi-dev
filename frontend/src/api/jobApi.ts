import { CommonApiResponse } from "@/types/api/common";
import customAxios from "./customAxios";
import { handleApiError } from "@/utils/api";
import { Jobs } from "@/components/Job/JopSelector";
import { AxiosError, AxiosResponse } from "axios";
export const getJobCategories = async <T>(): Promise<CommonApiResponse<T>> => {
  try {
    const { data, status }: AxiosResponse<T> = await customAxios.get(
      `/job-categories`
    );
    return { data };
  } catch (e) {
    return handleApiError(e);
  }
};

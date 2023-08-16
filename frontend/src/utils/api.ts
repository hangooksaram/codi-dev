import { CommonApiResponse } from "@/types/api/common";
import { AxiosError, isAxiosError } from "axios";

export const handleApiError = (e: unknown) => {
  if (isAxiosError(e)) {
    return {
      status: e.response?.status,
      errorMessage: e.response?.data.message,
    };
  } else return { errorMessage: "unknown error occured" };
};

export const handleApiCallback = (
  status: number,
  onSuccess: Function,
  onFail: Function
) => {
  if (status >= 400) {
    onFail();
  } else onSuccess();
};

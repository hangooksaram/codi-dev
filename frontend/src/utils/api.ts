import { CommonApiResponse } from "@/types/api/common";
import { AxiosError } from "axios";

export const handleApiError = (e: unknown): CommonApiResponse<undefined> => {
  let errorMessage = "";
  let status = 0;
  if (e instanceof AxiosError) {
    errorMessage = e.message;
    status = e.response!.status;
  } else {
    errorMessage = "Unexpected error is occured";
  }
  return {
    status,
    errorMessage,
  };
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

import { CommonApiResponse } from "@/types/api/common";
import { AxiosError } from "axios";

export const handleApiError = (e: unknown) => {
  if (e instanceof AxiosError) {
    throw new Error(e.message);
  } else throw new Error("unexpected error occured");
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

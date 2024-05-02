import { CommonApiResponse } from '@/types/api/common';
import customAxios from './customAxios';
import { handleApiError } from '@/utils/api';
import {
  CheckAccessTokenResponse,
  CheckLoginInfoResponse,
} from '@/types/api/auth';

export const checkAccessToken = async (): Promise<
  CommonApiResponse<CheckAccessTokenResponse>
> => {
  try {
    const res = await customAxios.get(`/auth/check-access-token`);
    const { data, status } = res;

    return { data, status };
  } catch (e: unknown) {
    return handleApiError(e);
  }
};

export const checkLoginInfo = async (): Promise<
  CommonApiResponse<CheckLoginInfoResponse>
> => {
  try {
    const res = await customAxios.get(`/auth/check-login-info`);
    const { data, status } = res;

    return { data, status };
  } catch (e: unknown) {
    return handleApiError(e);
  }
};

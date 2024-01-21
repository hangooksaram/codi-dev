import { UpdatePasswordBody } from '@/types/api/sign'
import customAxios from './customAxios'
import { CommonApiResponse } from '@/types/api/common'
import { handleApiError } from '@/utils/api'

export const updatePassword = async (
  passwordInfo: UpdatePasswordBody,
): Promise<CommonApiResponse> => {
  try {
    const { data, status } = await customAxios.patch(`/members/`, passwordInfo)
    return { data, status }
  } catch (e) {
    return handleApiError(e)
  }
}

export const findId = async (email: string): Promise<CommonApiResponse> => {
  try {
    const { data, status } = await customAxios.post(`/account/find-id`, {
      email,
    })
    return { data, status }
  } catch (e) {
    return handleApiError(e)
  }
}

export const findPassword = async (
  email: string,
  id: string,
): Promise<CommonApiResponse> => {
  try {
    const { data, status } = await customAxios.post(`/account/find-pw`, {
      email,
      id,
    })
    return { data, status }
  } catch (e) {
    return handleApiError(e)
  }
}

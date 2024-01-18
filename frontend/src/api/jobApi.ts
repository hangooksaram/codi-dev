import { AxiosResponse } from 'axios'
import { CommonApiResponse } from '@/types/api/common'
import customAxios from './customAxios'
import { handleApiError } from '@/utils/api'

export const getJobCategories = async <T>(): Promise<CommonApiResponse<T>> => {
  try {
    const { data, status }: AxiosResponse<T> =
      await customAxios.get(`/job-categories`)
    return { data }
  } catch (e) {
    return handleApiError(e)
  }
}

export const getJobRanks = async () => (await customAxios.get('/rank/')).data

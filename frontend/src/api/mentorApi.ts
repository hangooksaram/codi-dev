import { AxiosResponse, AxiosResponseHeaders } from 'axios';
import {
  GetMentorsParameters,
  GetRecommendationMentorsParameters,
  RegisterMentorBody,
  RegisterMentorResponse,
} from '@/types/api/mentor';
import customAxios from './customAxios';
import { handleApiError } from '@/utils/api';
import { CommonApiResponse } from '@/types/api/common';
import { getToken, setTokenToLocalStorage } from '@/utils/auth';

export const registerMentor = async (
  mentor: FormData,
): Promise<CommonApiResponse<RegisterMentorResponse>> => {
  try {
    const { data, status, headers }: AxiosResponse<RegisterMentorResponse> =
      await customAxios.post(`/mentors/`, mentor, {
        headers: {
          'Content-Type': 'multitype/form-data',
        },
      });

    setTokenToLocalStorage(getToken(headers as AxiosResponseHeaders)!);
    return { data: data!, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const editMentor = async (
  mentor: FormData,
): Promise<CommonApiResponse<RegisterMentorResponse>> => {
  try {
    const { data, status }: AxiosResponse<RegisterMentorResponse> =
      await customAxios.patch(`/mentors/`, mentor, {
        headers: {
          'Content-Type': 'multitype/form-data',
        },
      });
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const getRecommendationMentors = async (
  params: GetRecommendationMentorsParameters,
) => {
  const { disability, firstJob, secondJob, thirdJob } = params;
  return (
    await customAxios.get(
      `/mentors/recommend?disability=${disability}&firstJob=${firstJob}&secondJob=${secondJob}&thirdJob=${thirdJob}`,
    )
  ).data;
};

export const getFavoriteMentors = async () => {
  return (await customAxios.get(`/profiles/favorites`)).data;
};

export const getMentors = async (
  mentorsParams: GetMentorsParameters,
  page: number,
  size?: number,
) => {
  const { job, career, disability, keyword } = mentorsParams;

  return (
    await customAxios.get(
      `/mentors/search?page=${page}&size=${size}&job=${job}&career=${career}&disability=${disability}&keyword=${keyword}`,
    )
  ).data;
};

export const getMentor = async (mentorId?: number) => {
  return (await customAxios.get(`/mentors/${mentorId ?? ''}`)).data!;
};

export const likeMentor = async (mentorId: number) => {
  try {
    const { data, status }: AxiosResponse = await customAxios.post(
      `/profiles/favorites/${mentorId}`,
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const unLikeMentor = async (mentorId: number) => {
  try {
    const { data, status }: AxiosResponse = await customAxios.delete(
      `/profiles/favorites/${mentorId}`,
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

import {
  GetMentorsParameters,
  GetRecommendationMentorsParameters,
  RegisterMentorBody,
  RegisterMentorResponse,
} from "@/types/api/mentor";
import customAxios from "./customAxios";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils/api";
import { CommonApiResponse } from "@/types/api/common";

export const registerMentor = async (
  memberId: string,
  mentor: FormData
): Promise<CommonApiResponse<RegisterMentorResponse>> => {
  try {
    const { data, status }: AxiosResponse<RegisterMentorResponse> =
      await customAxios.post(`/mentors/${memberId}`, mentor, {
        headers: {
          "Content-Type": "multitype/form-data",
        },
      });
    return { data: data!, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const editMentor = async (
  mentorId: number,
  mentor: FormData
): Promise<CommonApiResponse<RegisterMentorResponse>> => {
  try {
    const { data, status }: AxiosResponse<RegisterMentorResponse> =
      await customAxios.patch(`/mentors/${mentorId}`, mentor, {
        headers: {
          "Content-Type": "multitype/form-data",
        },
      });
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const getRecommendationMentors = async (
  params: GetRecommendationMentorsParameters
) => {
  const { disability, firstJob, secondJob, thirdJob } = params;
  return (
    await customAxios.get(
      `/mentors/recommend?disability=${disability}&firstJob=${firstJob}&secondJob=${secondJob}&thirdJob=${thirdJob}`
    )
  ).data;
};

export const getFavoriteMentors = async (profileId: number) => {
  return (await customAxios.get(`/profiles/${profileId}/favorites`)).data;
};

export const getMentors = async (
  mentorsParams: GetMentorsParameters,
  page: number,
  size?: number
) => {
  const { job, career, disability, keyword } = mentorsParams;

  return (
    await customAxios.get(
      `/mentors?page=${page}&size=${size}&job=${job}&career=${career}&disability=${disability}&keyword=${keyword}`
    )
  ).data;
};

export const getMentor = async (mentorId: number) => {
  return (await customAxios.get(`/mentors/${mentorId}`)).data!;
};

export const likeMentor = async (profileId: number, mentorId: number) => {
  try {
    const { data, status }: AxiosResponse = await customAxios.post(
      `/profiles/${profileId}/favorites/${mentorId}`
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const unLikeMentor = async (profileId: number, mentorId: number) => {
  try {
    const { data, status }: AxiosResponse = await customAxios.delete(
      `/profiles/${profileId}/favorites/${mentorId}`
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

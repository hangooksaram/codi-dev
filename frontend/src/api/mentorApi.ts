import { GetMentorsParameters, applyMentorBody } from "@/types/api/mentor";
import customAxios from "./customAxios";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils/api";

export const applyMentor = async <T>(memberId: string, mentor: FormData) => {
  try {
    const { data, status }: AxiosResponse<T> = await customAxios.post(
      `/mentors/${memberId}`,
      mentor,
      {
        headers: {
          "Content-Type": "multitype/form-data",
        },
      }
    );
    return { data, status };
  } catch (e) {
    return handleApiError(e);
  }
};

export const getMentors = async (mentorsParams: GetMentorsParameters) => {
  const { page, size, job, career, disability, keyword } = mentorsParams;
  return (
    await customAxios.get(
      `/mentors?page=${page}&size=${size}&job=${job}&careere=${career}&disability=${disability}`
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

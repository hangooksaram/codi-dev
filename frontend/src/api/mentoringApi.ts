import { handleApiError } from "@/utils/api";
import customAxios from "./customAxios";
import { ApplyMentoringBody } from "@/types/api/mentoring";

export const getMentoringsByMonth = async (date: string) => {
  return (await customAxios.get(`/mock/${date}`)).data;
};

export const applyMentoring = async (
  profileId: number,
  mentorId: number,
  application: ApplyMentoringBody
) => {
  try {
    const { status } = await customAxios.post(
      `/mentees/mentoring/${profileId}/apply/${mentorId}`,
      application
    );
    return { status };
  } catch (e: unknown) {
    return handleApiError(e);
  }
};

export const cancelMentoring = async (profileId: number, mentorId: number) => {
  try {
    const { status } = await customAxios.patch(
      `/mentees/mentoring/${profileId}/applications/${mentorId}/cancel`
    );
    return { status };
  } catch (e: unknown) {
    return handleApiError(e);
  }
};

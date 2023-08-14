import { handleApiError } from "@/utils/api";
import customAxios from "../customAxios";
import { MentoringPlatform } from "@/types/mentoring";

export const getMentoringApplies = async (mentorId: number) =>
  (
    await customAxios.get(
      `/mentors/mentoring/${mentorId}/application?page=1&size=10`
    )
  ).data;

export const acceptMentoring = async (mentorId: number, mentoringId: number) =>
  (
    await customAxios.patch(
      `/mentors/mentoring/${mentorId}/${mentoringId}/accept`
    )
  ).data;

export const rejectMentoring = async (mentorId: number, mentoringId: number) =>
  (
    await customAxios.patch(
      `/mentors/mentoring/${mentorId}/${mentoringId}/reject`
    )
  ).data;

export const addMentoringLink = async (
  mentorId: number,
  mentoringId: number,
  linkObj: { link: string; platform: MentoringPlatform }
) => {
  try {
    const { data, status } = await customAxios.patch(
      `/mentors/mentoring/${mentorId}/${mentoringId}/link`,
      linkObj
    );

    return { data, status };
  } catch (e) {
    handleApiError(e);
  }
};

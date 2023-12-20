import { handleApiError } from "@/utils/api";
import customAxios from "../customAxios";
import { MentoringPlatform } from "@/types/mentoring";

export const getMentoringApplies = async () =>
  (await customAxios.get(`/mentors/mentoring/application?page=1&size=10`)).data;

export const acceptMentoring = async (mentoringId: number) => {
  (await customAxios.patch(`/mentors/mentoring/${mentoringId}/accept`)).data;
};

export const rejectMentoring = async (mentoringId: number) =>
  (await customAxios.patch(`/mentors/mentoring/${mentoringId}/reject`)).data;

export const addMentoringLink = async (
  mentoringId: number,
  linkObj: { link: string; platform: MentoringPlatform }
) => {
  try {
    const { data, status } = await customAxios.patch(
      `/mentors/mentoring/${mentoringId}/link`,
      linkObj
    );

    return { data, status };
  } catch (e) {
    handleApiError(e);
  }
};

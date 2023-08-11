import customAxios from "../customAxios";

export const getMentoringApplies = async (mentorId: number) =>
  (await customAxios.get(`/mentors/mentoring/${mentorId}`)).data;

export const acceptMentoring = async (mentorId: number, mentoringId: number) =>
  (
    await customAxios.patch(
      `/mentors/mentoring/${mentorId}/${mentoringId}/accpet`
    )
  ).data;

export const rejectMentoring = async (mentorId: number, mentoringId: number) =>
  (
    await customAxios.patch(
      `/mentors/mentoring/${mentorId}/${mentoringId}/reject`
    )
  ).data;

import {
  GetDailyMentoringsParams,
  GetMonthlyMentoringsParams,
} from "@/types/api/mentoring";
import customAxios from "../customAxios";

export const getDailyMentorings = async ({
  date,
}: GetDailyMentoringsParams) => {
  return (
    await customAxios.get(
      // `${mentoringApiEndpoint("daily", profileId, mentorId)}?date=${date}`
      `/mentees/mentoring/daily?date=${date}`
    )
  ).data;
};

export const getMonthlyMentorings = async ({
  month,
}: GetMonthlyMentoringsParams) => {
  return (
    await customAxios.get(
      // `${mentoringApiEndpoint(
      //   "monthly",
      //   profileId,
      //   mentorId
      // )}?month=${month}`
      `/mentees/mentoring/monthly?month=${month}`
    )
  ).data;
};

const mentoringApiEndpoint = (
  type: string,
  profileId?: number,
  mentorId?: number
) => {
  return `/${profileId ? "mentees" : "mentors"}/mentoring/${type}/${
    profileId ?? mentorId
  }`;
};

export const getTodayMentorings = async (profileId: number) => {
  return (
    await customAxios.get(`/mentees/mentoring/mentoring-schedules/${profileId}`)
  ).data;
};

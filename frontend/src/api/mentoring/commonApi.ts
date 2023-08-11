import {
  GetDailyMentoringsParams,
  GetMonthlyMentoringsParams,
} from "@/types/api/mentoring";
import customAxios from "../customAxios";

export const getDailyMentorings = async ({
  profileId,
  mentorId,
  date,
}: GetDailyMentoringsParams) => {
  return (
    await customAxios.get(
      `/${profileId ? "mentees" : "mentors"}/mentoring/daily/${
        profileId ?? mentorId
      }?date=${date}`
    )
  ).data;
};

export const getMonthlyMentorings = async ({
  profileId,
  mentorId,
  month,
}: GetMonthlyMentoringsParams) => {
  return (
    await customAxios.get(
      `/${profileId ? "mentees" : "mentors"}/mentoring/monthly/${
        profileId ?? mentorId
      }?month=${month}`
    )
  ).data;
};

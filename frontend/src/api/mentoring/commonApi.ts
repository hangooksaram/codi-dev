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
      `${getMentoringsUri("daily", profileId, mentorId)}?date=${date}`
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
      `${getMentoringsUri("monthly", profileId, mentorId)}?month=${month}`
    )
  ).data;
};

const getMentoringsUri = (
  type: string,
  profileId?: number,
  mentorId?: number
) => {
  return `/${profileId ? "mentees" : "mentors"}/mentoring/${type}/${
    profileId ?? mentorId
  }`;
};

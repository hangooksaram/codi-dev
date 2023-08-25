import {
  getDailyMentorings,
  getMonthlyMentorings,
  getTodayMentorings,
} from "@/api/mentoring/commonApi";
import { STALE_TIME } from "@/constants";
import {
  GetDailyMentoringsParams,
  GetMonthlyMentoringsParams,
  GetMonthlyMentoringsResponse,
  GetTodayMentoringsResponse,
} from "@/types/api/mentoring";
import { useQuery } from "@tanstack/react-query";

export const GET_MENTEE_DAILY_MENTORINGS_KEY = ["dailyMentorings/mentee"];
export const GET_MENTEE_MONTHLY_MENTORINGS_KEY = ["monthlysMentorings/mentee"];
export const GET_MENTOR_DAILY_MENTORINGS_KEY = ["dailyMentorings/mentor"];
export const GET_MENTOR_MONTHLY_MENTORINGS_KEY = ["monthlysMentorings/mentor"];
export const GET_TODAY_MENTORINGS_KEY = ["todayMentorings"];

export const useDailyMentoringsQuery = ({
  date,
  profileId,
  mentorId,
}: GetDailyMentoringsParams) => {
  const queyKey = profileId
    ? GET_MENTEE_DAILY_MENTORINGS_KEY
    : GET_MENTOR_DAILY_MENTORINGS_KEY;
  return useQuery(
    queyKey.concat(date),
    () => getDailyMentorings({ profileId, mentorId, date }),
    {
      enabled: mentorId !== undefined || profileId !== undefined,
      retry: false,
      staleTime: STALE_TIME.SOMETIMES,
    }
  );
};

export const useMonthlyMentoringsQuery = ({
  month,
  profileId,
  mentorId,
}: GetMonthlyMentoringsParams) => {
  const queyKey = profileId
    ? GET_MENTEE_MONTHLY_MENTORINGS_KEY
    : GET_MENTOR_MONTHLY_MENTORINGS_KEY;

  return useQuery<GetMonthlyMentoringsResponse>(
    queyKey.concat(month),
    () => getMonthlyMentorings({ profileId, mentorId, month }),
    {
      enabled:
        ((mentorId !== undefined && mentorId !== undefined) ||
          (profileId !== undefined && profileId !== undefined)) &&
        month !== undefined,
      staleTime: STALE_TIME.SOMETIMES,
    }
  );
};

export const useTodayMentoringsQuery = (profileId: number) => {
  return useQuery<GetTodayMentoringsResponse[]>(
    GET_TODAY_MENTORINGS_KEY,
    () => getTodayMentorings(profileId!),
    {
      enabled: profileId !== undefined,
      staleTime: STALE_TIME.SOMETIMES,
    }
  );
};

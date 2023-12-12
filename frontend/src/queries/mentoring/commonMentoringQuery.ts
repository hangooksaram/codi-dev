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

export const GET_DAILY_MENTORINGS_KEY = ["dailyMentorings"];
export const GET_MONTHLY_MENTORINGS_KEY = ["monthlysMentorings"];
export const GET_TODAY_MENTORINGS_KEY = ["todayMentorings"];

export const useDailyMentoringsQuery = ({
  date,
  type,
}: GetDailyMentoringsParams) => {
  const querykey = GET_DAILY_MENTORINGS_KEY;
  return useQuery(
    querykey.concat(date),
    () => getDailyMentorings({ date, type }),
    {
      enabled: date !== "",
      retry: false,
      staleTime: STALE_TIME.SOMETIMES,
    }
  );
};

export const useMonthlyMentoringsQuery = ({
  month,
  type,
}: GetMonthlyMentoringsParams) => {
  const querykey = GET_MONTHLY_MENTORINGS_KEY;

  return useQuery<GetMonthlyMentoringsResponse>(
    querykey.concat(month),
    () => getMonthlyMentorings({ month, type }),
    {
      enabled: month !== undefined,
      staleTime: STALE_TIME.SOMETIMES,
    }
  );
};

export const useTodayMentoringsQuery = (isProfile: boolean) => {
  return useQuery<GetTodayMentoringsResponse[]>(
    [...GET_TODAY_MENTORINGS_KEY, isProfile],
    () => getTodayMentorings(),
    {
      staleTime: STALE_TIME.SOMETIMES,
    }
  );
};

import {
  addSchedule,
  getDailySchedules,
  getMonthlySchedules,
} from "@/api/scheduleApi";
import { STALE_TIME } from "@/constants";
import {
  GetDailySchedulesResponse,
  GetMonthlySchedulesResponse,
} from "@/types/api/schedule";
import { Schedule } from "@/types/schedule";
import { useMutation, useQuery } from "@tanstack/react-query";

export const GET_DAILY_SCHEDULES_KEY = ["dailyScheules"];
export const GET_MONTHLY_SCHEDULES_KEY = ["monthlyScheules"];
export const ADD_SCHEDULES_KEY = ["addSchedule"];
const useDailySchedulesQuery = (mentorId: number, date: string) => {
  return useQuery<GetDailySchedulesResponse>(
    GET_DAILY_SCHEDULES_KEY.concat(date),
    () => getDailySchedules(mentorId, date),
    {
      enabled: mentorId !== undefined && date !== "",
      retry: false,
      staleTime: STALE_TIME.OFTEN,
    }
  );
};

export const useMonthlySchedulesQuery = (mentorId: number, month: string) => {
  return useQuery<GetMonthlySchedulesResponse>(
    GET_MONTHLY_SCHEDULES_KEY.concat(month),
    () => getMonthlySchedules(mentorId, month),
    {
      enabled: mentorId !== undefined && month !== undefined,
      staleTime: STALE_TIME.OFTEN,
    }
  );
};

export const useScheduleMutation = (mentorId: number) => {
  return useMutation((schedule: Schedule) => addSchedule(mentorId, schedule));
};

export default useDailySchedulesQuery;

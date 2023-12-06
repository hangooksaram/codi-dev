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
const useDailySchedulesQuery = (date: string, mentorId?: number) => {
  return useQuery<GetDailySchedulesResponse>(
    GET_DAILY_SCHEDULES_KEY.concat(date),
    () => getDailySchedules(date, mentorId!),
    {
      enabled: date !== "",
      retry: false,
      staleTime: STALE_TIME.OFTEN,
    }
  );
};

export const useMonthlySchedulesQuery = (month: string, mentorId?: number) => {
  return useQuery<GetMonthlySchedulesResponse>(
    GET_MONTHLY_SCHEDULES_KEY.concat(month),
    () => getMonthlySchedules(month, mentorId!),
    {
      enabled: month !== undefined,
      staleTime: STALE_TIME.OFTEN,
    }
  );
};

export const useScheduleMutation = (refetchMonthlySchedule?: Function) => {
  return useMutation({
    mutationFn: (schedule: Schedule) => addSchedule(schedule),
    onSuccess: () => {
      if (refetchMonthlySchedule) refetchMonthlySchedule!();
    },
  });
};

export default useDailySchedulesQuery;

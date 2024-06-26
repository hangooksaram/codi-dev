import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addSchedule,
  getDailySchedules,
  getMonthlySchedules,
} from '@/api/scheduleApi';
import { STALE_TIME } from '@/constants';
import {
  GetDailySchedulesResponse,
  GetMonthlySchedulesResponse,
} from '@/types/api/schedule';
import { Schedule } from '@/types/schedule';

export const GET_DAILY_SCHEDULES_KEY = ['dailyScheules'];
export const GET_MONTHLY_SCHEDULES_KEY = ['monthlyScheules'];
export const ADD_SCHEDULES_KEY = ['addSchedule'];
const useDailySchedulesQuery = ({date, mentorId, updated} : {date:string, mentorId?:number, updated?:number}) => {
  return useQuery<GetDailySchedulesResponse>(
    [...GET_DAILY_SCHEDULES_KEY, date, updated],
    () => getDailySchedules(date, mentorId!),
    {
      enabled: date !== '',
      retry: false,
    },
  );
};

export const useMonthlySchedulesQuery = ({month, mentorId, updated}:{month: string, mentorId?: number, updated?:number}) => {
  return useQuery<GetMonthlySchedulesResponse>(
    [...GET_MONTHLY_SCHEDULES_KEY, month, updated],
    () => getMonthlySchedules(month, mentorId!),
    {
      enabled: month !== undefined,
      staleTime: STALE_TIME.OFTEN,
    },
  );
};

export const useScheduleMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (schedule: Schedule) => addSchedule(schedule),
    onSuccess: onSuccess!,
    onError: onError!,
  });
};

export default useDailySchedulesQuery;

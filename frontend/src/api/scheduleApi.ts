import { Schedule } from '@/types/schedule';
import customAxios from './customAxios';

export const getDailySchedules = async (date: string, mentorId?: number) => {
  return (
    await customAxios.get(`/schedule/daily/${mentorId ?? ''}?date=${date}`)
  ).data;
};
export const getMonthlySchedules = async (month: string, mentorId?: number) => {
  return (
    await customAxios.get(`/schedule/monthly/${mentorId ?? ''}?month=${month}`)
  ).data;
};

export const addSchedule = async (schedule: Schedule) => {
  return (await customAxios.post(`/schedule/`, schedule)).data;
};

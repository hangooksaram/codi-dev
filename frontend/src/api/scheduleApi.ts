import { Schedule } from "@/types/schedule";
import customAxios from "./customAxios";

export const getDailySchedules = async (mentorId: number, date: string) => {
  return (await customAxios.get(`/schedule/daily/${mentorId}?date=${date}`))
    .data;
};

export const getMonthlySchedules = async (mentorId: number, month: string) => {
  return (await customAxios.get(`/schedule/monthly/${mentorId}?month=${month}`))
    .data;
};

export const addSchedule = async (mentorId: number, schedule: Schedule) => {
  return (await customAxios.post(`/schedule/${mentorId}`, schedule)).data;
};

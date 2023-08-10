import { Schedule } from "@/types/schedule";
import customAxios from "./customAxios";

export const getSchedules = async (mentorId: number, date: string) => {
  return (await customAxios.get(`/${mentorId}/${date}`)).data;
};

export const addSchedule = async (mentorId: number, schedule: Schedule) => {
  return (await customAxios.post(`/schedule/${mentorId}`, schedule)).data;
};

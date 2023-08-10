import { Schedule } from "@/types/schedule";
import customAxios from "./customAxios";

const getSchedules = async (mentorId: number, date: string) => {
  return (await customAxios.get(`/${mentorId}/${date}`)).data;
};

const addSchedule = async (mentorId: number, schedule: Schedule) => {
  return (await customAxios.post(`/schedule/${mentorId}`, schedule)).data;
};

export { getSchedules, addSchedule };

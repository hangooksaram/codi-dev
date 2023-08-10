import { addSchedule, getSchedules } from "@/api/scheduleApi";
import { Schedule } from "@/types/schedule";
import { useMutation, useQuery } from "@tanstack/react-query";

export const GET_SCHEDULES_KEY = ["scheules"];
export const ADD_SCHEDULES_KEY = ["addSchedule"];
const useScheduleQuery = (mentorId: number, date: string) => {
  return useQuery(GET_SCHEDULES_KEY.concat(date), () =>
    getSchedules(mentorId, date)
  );
};

const useScheduleMutation = (mentorId: number) => {
  return useMutation(ADD_SCHEDULES_KEY, (schedule: Schedule) =>
    addSchedule(mentorId, schedule)
  );
};

export default useScheduleQuery;

export { useScheduleMutation };

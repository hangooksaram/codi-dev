import { getSchedules } from "@/api/scheduleApi";
import { useQuery } from "@tanstack/react-query";

export const GET_SCHEDULES_KEY = ["scheules"];
const useScheduleQuery = (mentorId: number, date: string) => {
  return useQuery(GET_SCHEDULES_KEY.concat(date), () =>
    getSchedules(mentorId, date)
  );
};

export default useScheduleQuery;

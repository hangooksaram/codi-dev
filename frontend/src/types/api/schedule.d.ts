import { Schedule, ScheduleTime } from "../schedule";

export interface GetMonthlySchedulesResponse {
  month: string;
  days: Schedule[];
}

export interface GetDailySchedulesResponse {
  date: string;
  times: ScheduleTime[];
}

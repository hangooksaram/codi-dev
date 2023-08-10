import { Status } from "./mentoring";

export interface Schedule {
  date: string;
  times: { time: string }[];
}

export interface ScheduleTime {
  time: string;
  status: Status;
}

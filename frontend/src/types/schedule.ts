import { Status } from "./mentoring";

export interface Schedule {
  date: string;
  times: ScheuleTimes[];
}

export interface ScheuleTimes {
  time: string;
  status: Status;
}

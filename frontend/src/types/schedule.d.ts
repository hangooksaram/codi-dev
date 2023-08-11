export interface Schedule {
  date: string;
  times: ScheduleTime[];
}

export interface ScheduleTime {
  time: string;
  enabled?: boolean;
}

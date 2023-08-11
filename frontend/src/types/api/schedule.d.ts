import { Schedule } from "../schedule";

export interface GetMonthlySchedulesResponse {
  month: string;
  days: Schedule[];
}

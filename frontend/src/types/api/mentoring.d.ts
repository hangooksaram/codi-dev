import { Schedule } from "../schedule";

export interface ApplyMentoringBody {
  applicationReason: string;
  date: string;
  time: Schedule[];
}

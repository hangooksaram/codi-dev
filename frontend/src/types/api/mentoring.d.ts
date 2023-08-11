import { Schedule } from "../schedule";

export interface ApplyMentoringBody {
  applicationReason: string;
  date: string;
  time: Schedule[];
}

export interface GetMentoringsParams {
  profileId?: number;
  mentorId?: number;
}

export interface GetDailyMentoringsParams extends GetMentoringsParams {
  date: string;
}

export interface GetMonthlyMentoringsParams extends GetMentoringsParams {
  month: string;
}

import {
  DailyMentoringMember,
  MentoringMember,
  MentoringMentee,
  MonthlyMentoringMembers,
} from "../mentoring";
import { Schedule } from "../schedule";

export interface ApplyMentoringBody {
  applicationReason: string;
  date: string;
  time: string;
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

export interface GetMentoringAppliesResponse {
  data: GetMentoringAppliesResponseData[];
  pageInfo: PageInfo;
}

export interface GetMentoringAppliesResponseData {
  mentoringId: number;
  menteeInfo: {
    profileId: number;
    name: string;
    employmentStatus: string;
    desiredJob: string;
    disability: string;
    severity: string;
    imgUrl: string;
  };
  applicationDate: string;
  applicationReason: string;
}

export interface GetMonthlyMentoringsResponse {
  month: string;
  monthlyMentoringMembers: DailyMentoringMember[];
}

export interface GetDailyMentoringsResponse {
  date: string;
  mentoringMembers: MentoringMember[];
}

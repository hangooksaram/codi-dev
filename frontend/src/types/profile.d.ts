import { ReactNode } from 'react';
import { MentoringPlatform } from './mentoring';

export interface MenteeProfile {
  id?: number;
  imgUrl?: string;
  job?: string;
  desiredJob?: string;
  education?: string;
  disability?: string;
  severity?: string;
  introduction?: string;
  employmentStatus?: string;
  name?: string;
  age?: number;
  favorites?: [];
}
export interface Mentor extends MenteeProfile {
  mentorId?: number;
  fileUrl?: null;
  isCertificate?: boolean;
  company?: string;
  career?: string;
  jobName?: string;
  inOffice?: boolean;
  star?: number;
  mentees?: number;
  applicationDate?: string;
  mentoringCategories?: string[];
  mentoringCount?:number;
  responseRate?:number;
  futureScheduleCount?:number;
}

export interface ProfileCardProps extends Mentor {
  width?: string;
  height?: string;
  mentorId?: number;
  link?: string;
  edit?: boolean;
  isMentorProfile?: boolean;
  isMyPage?: boolean;
  pageQueryInfo?: object;
  favorites?: number[];
  children?: ReactNode;
}

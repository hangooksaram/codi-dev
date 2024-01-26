export interface MentorMentoring {
  date: string;
  name: string;
  job: string;
  imgUrl: string;
  link: string;
  platform: string;
  status: string;
}

export type MentoringStatus =
  | 'APPLICATION'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'INITIAL';

export type MentoringPlatform =
  | 'Google Meeting'
  | 'Discord'
  | 'Zoom'
  | 'KakaoTalk';

export interface MentoringMember {
  profileId?: number;
  mentorId?: number;
  mentoringJob: string;
  imgUrl: string;
  link: string | null;
  mentoringId: number;
  name: string;
  platform: MentoringPlatform | string;
  time: string;
}
export interface DailyMentoringMember {
  date: string;
  mentoringMembers: MentoringMember[];
  mentoringStatus: MentoringStatus;
}

export interface DailyMentoringStatus {
  date: string;
  mentoringStatus: MentoringStatus;
}

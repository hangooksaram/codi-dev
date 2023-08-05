export interface MentorMentoring {
  date: string;
  name: string;
  job: string;
  imgUrl: string;
  link: string;
  platform: string;
  status: string;
}

export type Status = "APPLICATION" | "ACCEPTED" | "REJECTED" | "COMPLETED";

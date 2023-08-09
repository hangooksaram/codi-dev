import { Mentor } from "./mentor";

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
  favorites?: [];
}

export interface MentorProfile {
  id?: string;
  imgUrl?: string;
  desiredJob?: string;
  education?: string;
  disability?: string;
  severity?: string;
  introduction?: string;
  job?: string;
  employmentStatus?: string;
  favorites?: any[];
  mentorId?: number;
  name?: string;
  star?: number;
  mentees?: number;
}

export interface ProfileCard extends MentorProfile {
  width?: string;
  height?: string;
  edit?: boolean;
  mentor?: boolean;
  apply?: boolean;
}

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
  mentoringCategories?: string[];
}

export interface ProfileCard extends Mentor {
  width?: string;
  height?: string;
  edit?: boolean;
  mentor?: boolean;
  apply?: boolean;
  mentorId?: number;
  link?: string;
}

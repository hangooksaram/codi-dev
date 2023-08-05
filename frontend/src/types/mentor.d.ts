import { Mentee } from "./mentee";

export interface Mentor extends Mentee {
  mentorId?: number;
  name?: string;
  job?: string;
  isCertificate?: boolean;
  favorite?: string;
  star?: number;
  mentees?: number;
}

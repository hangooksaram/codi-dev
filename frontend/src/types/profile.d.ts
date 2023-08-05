import { Mentor } from "./mentor";

export interface ProfileCard extends Mentor {
  width?: string;
  height?: string;
  edit?: boolean;
  mentor?: boolean;
  apply?: boolean;
}

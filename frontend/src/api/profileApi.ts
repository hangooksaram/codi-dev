import { Profile } from "@/types/profile";
import axios from "axios";

const registerProfile = async (profile: Profile) =>
  (await axios.post("", profile)).data;

export { registerProfile };

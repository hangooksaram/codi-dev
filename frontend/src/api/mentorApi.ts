import { RegisterMentorData } from "@/types/mentor";
import axios from "axios";

const registerMentor = async (mentorData: RegisterMentorData) =>
  (await axios.post("", mentorData)).data;

export { registerMentor };

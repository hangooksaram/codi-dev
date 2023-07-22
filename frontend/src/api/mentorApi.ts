import { GetMentorsParameters, RegisterMentorData } from "@/types/mentor";
import axios from "axios";
import { BASE_URL } from "./signApi";

const registerMentor = async (mentorData: RegisterMentorData) =>
  (await axios.post("", mentorData)).data;

const getMentors = async (mentorsParams: GetMentorsParameters) => {
  const { page, size, job, career, disability, keyword } = mentorsParams;
  return (await axios.get(`${BASE_URL}/mentors?page=${page}&size=${size}`))
    .data;
};
export { registerMentor, getMentors };

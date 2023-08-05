import {
  GetMentorsParameters,
  RegisterMentorBody,
} from "@/types/api/payload/mentor";
import customAxios from "./customAxios";

const registerMentor = async (mentorData: RegisterMentorBody) =>
  (await customAxios.post("", mentorData)).data;

const getMentors = async (mentorsParams: GetMentorsParameters) => {
  const { page, size, job, career, disability, keyword } = mentorsParams;
  return (
    await customAxios.get(
      `/mentors?page=${page}&size=${size}&job=${job}&careere=${career}&disability=${disability}`
    )
  ).data;
};

export { registerMentor, getMentors };

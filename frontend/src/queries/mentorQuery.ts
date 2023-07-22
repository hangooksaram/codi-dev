// quires/useTodosQuery.ts
import { getMentors } from "@/api/mentorApi";
import { GetMentorsParameters, GetMentorsReponse } from "@/types/mentor";
import { useQuery } from "@tanstack/react-query";

export const GET_MENTORS_KEY = ["mentors"];

const useGetMentorsQuery = (mentorsParams: GetMentorsParameters) => {
  return useQuery(GET_MENTORS_KEY, () => getMentors(mentorsParams));
};

export default useGetMentorsQuery;

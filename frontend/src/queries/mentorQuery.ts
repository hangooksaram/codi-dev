// quires/useTodosQuery.ts
import { getMentor, getMentors } from "@/api/mentorApi";
import { GetMentorsParameters } from "@/types/api/mentor";
import { Mentor } from "@/types/profile";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const GET_MENTORS_KEY = ["mentors"];
export const GET_MENTOR_KEY = ["mentor"];

const useGetMentorsQuery = () => {
  const [query, setQuery] = useState<GetMentorsParameters>({
    page: 1,
    size: 10,
    job: "",
    disability: "",
    career: "",
  });

  const { data, isSuccess, refetch } = useQuery(GET_MENTORS_KEY, () =>
    getMentors(query)
  );
  const mentors = data?.data as Mentor[];

  return { query, setQuery, mentors, isSuccess, refetch };
};

export const useGetMentorQuery = (mentorId: number) => {
  const { data, isLoading, isSuccess } = useQuery<Mentor>(
    GET_MENTOR_KEY,
    () => getMentor(mentorId),
    { enabled: mentorId !== undefined && mentorId !== 0 }
  );

  return { data, isLoading, isSuccess };
};

export default useGetMentorsQuery;

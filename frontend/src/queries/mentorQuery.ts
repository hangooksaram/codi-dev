// quires/useTodosQuery.ts
import { getMentors } from "@/api/mentorApi";
import { GetMentorsParameters } from "@/types/api/mentor";
import { MentorProfile } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const GET_MENTORS_KEY = ["mentors"];

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
  const mentors = data?.data as MentorProfile[];

  return { query, setQuery, mentors, isSuccess, refetch };
};

export default useGetMentorsQuery;

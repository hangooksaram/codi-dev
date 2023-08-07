// quires/useTodosQuery.ts
import { getMentors } from "@/api/mentorApi";
import { GetMentorsParameters } from "@/types/api/payload/mentor";
import { Mentor } from "@/types/mentor";
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
  const mentors = data?.data as Mentor[];

  return { query, setQuery, mentors, isSuccess, refetch };
};

export default useGetMentorsQuery;

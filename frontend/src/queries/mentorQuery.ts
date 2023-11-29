import {
  getFavoriteMentors,
  getMentor,
  getMentors,
  getRecommendationMentors,
} from "@/api/mentorApi";
import { STALE_TIME } from "@/constants";
import { PageInfo } from "@/types/api/common";
import {
  GetMentorsParameters,
  GetRecommendationMentorsParameters,
} from "@/types/api/mentor";
import { Mentor } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

export const GET_MENTORS_KEY = ["mentors"];
export const GET_RECOMMENDATION_MENTORS_KEY = ["mentors/recommendation"];
export const GET_FAVORITE_MENTORS_KEY = ["mentors/favorite"];
export const GET_MENTOR_KEY = ["mentor"];

const useGetMentorsQuery = () => {
  const [searched, setSearched] = useState("");
  const [size, setSize] = useState(10);
  const [query, setQuery] = useState<GetMentorsParameters>({
    job: "",
    disability: "",
    career: "",
    keyword: "",
  });
  const [page, setPage] = useState(1);

  const { data, isSuccess, refetch } = useQuery(
    GET_MENTORS_KEY.concat([searched, page.toString()]),
    () => getMentors(query, page, size),
    {
      staleTime: STALE_TIME.SOMETIMES,
    }
  );

  const mentors = data?.data as Mentor[];
  const pageInfo = data?.pageInfo as PageInfo;

  return {
    query,
    setQuery,
    mentors,
    pageInfo,
    isSuccess,
    refetch,
    setSearched,
    page,
    setPage,
  };
};

export const useGetRecommendationMentorsQuery = (
  query: GetRecommendationMentorsParameters
) =>
  useQuery(
    GET_RECOMMENDATION_MENTORS_KEY,
    () => getRecommendationMentors(query!),
    {
      staleTime: STALE_TIME.SELDOM,
    }
  );

export const useGetFavoriteMentorsQuery = (profileId: number) => {
  const { data, isSuccess } = useQuery<Mentor[]>(
    GET_FAVORITE_MENTORS_KEY,
    () => getFavoriteMentors(profileId),
    {
      staleTime: STALE_TIME.OFTEN,
    }
  );
  const favoriteIds = data?.map(({ mentorId }) => mentorId!);

  return { data, isSuccess, favoriteIds };
};

export const useGetMentorQuery = (mentorId: number) => {
  const { data, isLoading, isSuccess } = useQuery<Mentor>(
    GET_MENTOR_KEY,
    () => getMentor(mentorId),
    {
      enabled: mentorId !== undefined && mentorId !== 0,
      staleTime: STALE_TIME.VERY_OFTEN,
    }
  );

  return { data, isLoading, isSuccess };
};

export default useGetMentorsQuery;

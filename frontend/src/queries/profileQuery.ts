import { getProfile } from "@/api/profileApi";
import { STALE_TIME } from "@/constants";
import { MenteeProfile } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

export const GET_MENTORS_KEY = ["mentors"];

const useGetProfileQuery = () => {
  const { data, isSuccess, isLoading, isError, isFetching } =
    useQuery<MenteeProfile>(GET_MENTORS_KEY, () => getProfile());

  return { data, isSuccess, isError, isLoading, isFetching };
};

export default useGetProfileQuery;

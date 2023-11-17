import { getProfile } from "@/api/profileApi";
import { STALE_TIME } from "@/constants";
import { MenteeProfile } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

export const GET_MENTORS_KEY = ["mentors"];

const useGetProfileQuery = (profileId: number) => {
  const { data, isSuccess, isLoading, isError, isFetching } =
    useQuery<MenteeProfile>(GET_MENTORS_KEY, () => getProfile(profileId), {
      enabled: Number.isSafeInteger(profileId) && profileId !== 0,
    });

  return { data, isSuccess, isError, isLoading, isFetching };
};

export default useGetProfileQuery;

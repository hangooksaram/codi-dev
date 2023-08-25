import { getProfile } from "@/api/profileApi";
import { STALE_TIME } from "@/constants";
import { MenteeProfile } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

export const GET_MENTORS_KEY = ["mentors"];

const useGetProfileQuery = (profileId: number) => {
  const { data, isSuccess, isError, isLoading } = useQuery<MenteeProfile>(
    GET_MENTORS_KEY,
    () => getProfile(profileId),
    {
      enabled: profileId !== undefined && profileId !== 0,
      staleTime: STALE_TIME.SOMETIMES,
    }
  );

  return { data, isSuccess, isError, isLoading };
};

export default useGetProfileQuery;

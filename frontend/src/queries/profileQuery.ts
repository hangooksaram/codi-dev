// quires/useTodosQuery.ts
import { getMentors } from "@/api/mentorApi";
import { getProfile } from "@/api/profileApi";
import { GetMentorsParameters } from "@/types/api/mentor";
import { MenteeProfile } from "@/types/profile";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const GET_MENTORS_KEY = ["mentors"];

const useGetProfileQuery = (profileId: number) => {
  const { data, isSuccess, isError, isLoading } = useQuery<MenteeProfile>(
    GET_MENTORS_KEY,
    () => getProfile(profileId),
    { enabled: profileId !== undefined && profileId !== 0 }
  );

  return { data, isSuccess, isError, isLoading };
};

export default useGetProfileQuery;

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getProfile } from '@/api/profileApi';
import { STALE_TIME } from '@/constants';
import { MenteeProfile } from '@/types/profile';

export const GET_MENTORS_KEY = ['mentors'];

const useGetProfileQuery = (profileId?: string) => {
  const { data, isSuccess, isLoading, isError, isFetching } =
    useQuery<MenteeProfile>(GET_MENTORS_KEY, () => getProfile(profileId));

  return { data, isSuccess, isError, isLoading, isFetching };
};

export default useGetProfileQuery;

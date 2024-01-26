import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/profileApi';
import { MenteeProfile } from '@/types/profile';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/user/userSlice';

export const GET_MENTORS_KEY = ['mentors'];

const useGetProfileQuery = (profileId?: string) => {
  const user = useSelector(selectUser);
  
  const { data, isSuccess, isLoading, isError, isFetching } =
    useQuery<MenteeProfile>(GET_MENTORS_KEY, () => getProfile(profileId),{
      enabled: profileId !==undefined || user.isProfile
    });

  return { data, isSuccess, isError, isLoading, isFetching };
};

export default useGetProfileQuery;

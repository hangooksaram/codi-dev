import { useQuery } from '@tanstack/react-query';
import { getJobRanks } from '@/api/jobApi';
import { STALE_TIME } from '@/constants';
import { JobRanks } from '@/types/job';
import { selectUser } from '@/features/user/userSlice';
import { useSelector } from 'react-redux';

const JOB_RANKS = ['jobRanks'];

export const useJobRanksQuery = () => {
  const {id} =useSelector(selectUser);
  return useQuery<JobRanks>(JOB_RANKS, () => getJobRanks(), {
    staleTime: STALE_TIME.SOMETIMES,
    enabled : id !== undefined
  });
};

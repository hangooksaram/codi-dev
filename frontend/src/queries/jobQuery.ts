import { useQuery } from '@tanstack/react-query'
import { getJobRanks } from '@/api/jobApi'
import { STALE_TIME } from '@/constants'
import { JobRanks } from '@/types/job'

const JOB_RANKS = ['jobRanks']

export const useJobRanksQuery = () => {
  return useQuery<JobRanks>(JOB_RANKS, () => getJobRanks(), {
    staleTime: STALE_TIME.SOMETIMES,
  })
}

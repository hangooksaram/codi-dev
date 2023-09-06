import { getJobRanks } from "@/api/jobApi";
import { STALE_TIME } from "@/constants";
import { JobRanks } from "@/types/job";
import { useQuery } from "@tanstack/react-query";

const JOB_RANKS = ["jobRanks"];

export const useJobRanksQuery = (memberId: string) => {
  return useQuery<JobRanks>(JOB_RANKS, () => getJobRanks(memberId), {
    enabled: memberId !== undefined,
    staleTime: STALE_TIME.SOMETIMES,
  });
};

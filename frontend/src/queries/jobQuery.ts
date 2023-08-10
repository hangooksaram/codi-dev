import { getJobRanks } from "@/api/jobApi";
import { useQuery } from "@tanstack/react-query";

const JOB_RANKS = ["jobRanks"];

export const useJobRanksQuery = (memberId: string) => {
  return useQuery(JOB_RANKS, () => getJobRanks(memberId), {
    enabled: memberId !== null && memberId.length > 0,
  });
};

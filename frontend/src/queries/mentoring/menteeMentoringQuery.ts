import { applyMentoring, cancelMentoring } from "@/api/mentoring/menteeApi";
import { ApplyMentoringBody } from "@/types/api/mentoring";
import { useMutation } from "@tanstack/react-query";

export const APPLY_MENTORING = ["applyMentoings"];
export const CANCEL_MENTORING = ["cancelMentoings"];

export const useApplyMentoringMutation = (
  profileId: number,
  mentorId: number
) =>
  useMutation(APPLY_MENTORING, (application: ApplyMentoringBody) =>
    applyMentoring(profileId, mentorId, application)
  );

export const useCancelMentoringMutation = (
  profileId: number,
  mentorId: number
) => useMutation(CANCEL_MENTORING, () => cancelMentoring(profileId, mentorId));

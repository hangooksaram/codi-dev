import {
  acceptMentoring,
  getMentoringApplies,
  rejectMentoring,
} from "@/api/mentoring/mentorApi";

import { useMutation, useQuery } from "@tanstack/react-query";

export const GET_MENTORING_APPLIES = ["mentoringApplies"];
export const ACCEPT_MENTORING = ["acceptMentoring"];
export const REJECT_MENTORING = ["rejectMentoring"];

export const useMentoringApplies = (mentorId: number) => {
  return useQuery(GET_MENTORING_APPLIES, () => getMentoringApplies(mentorId), {
    enabled: mentorId !== null,
  });
};

export const useMentoringAcceptMutation = (
  mentorId: number,
  mentoringId: number
) =>
  useMutation(ACCEPT_MENTORING, () => acceptMentoring(mentorId, mentoringId));

export const useMentoringRejectMutation = (
  mentorId: number,
  mentoringId: number
) =>
  useMutation(REJECT_MENTORING, () => rejectMentoring(mentorId, mentoringId));

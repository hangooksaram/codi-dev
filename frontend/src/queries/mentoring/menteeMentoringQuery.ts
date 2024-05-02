import { useMutation } from '@tanstack/react-query';
import { applyMentoring, cancelMentoring } from '@/api/mentoring/menteeApi';
import { ApplyMentoringBody } from '@/types/api/mentoring';

export const APPLY_MENTORING = ['applyMentoings'];
export const CANCEL_MENTORING = ['cancelMentoings'];

export const useApplyMentoringMutation = (mentorId: number, onSuccess?: () => void,
onError?: () => void,) =>
  useMutation(APPLY_MENTORING, (application: ApplyMentoringBody) =>
    applyMentoring(mentorId, application),
    {
      onSuccess: onSuccess!,
      onError: onError!,
    }
  );

export const useCancelMentoringMutation = (
  profileId: number,
  mentorId: number,
) => useMutation(CANCEL_MENTORING, () => cancelMentoring(mentorId));

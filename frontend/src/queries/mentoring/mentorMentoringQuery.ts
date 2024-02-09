import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  acceptMentoring,
  getMentoringApplies,
  rejectMentoring,
} from '@/api/mentoring/mentorApi';
import { selectUser } from '@/features/user/userSlice';
import { GetMentoringAppliesResponse } from '@/types/api/mentoring';

export const GET_MENTORING_APPLIES = ['mentoringApplies'];
export const ACCEPT_MENTORING = ['acceptMentoring'];
export const REJECT_MENTORING = ['rejectMentoring'];

export const useMentoringApplies = () => {
  const { isMentor } = useSelector(selectUser);

  return useQuery<GetMentoringAppliesResponse>(
    GET_MENTORING_APPLIES,
    () => getMentoringApplies(),
    { enabled: isMentor },
  );
};

  export const useResponseMentoringMutation = (
    mentoringId: number,
    type:ResponseMentoringType,
    onSuccess?: (type:ResponseMentoringType) => void,
    onError?: (type:ResponseMentoringType) => void,
  ) => 
  {const queryKey = type==="accept" ? ACCEPT_MENTORING :  REJECT_MENTORING;
  const queryFn = type==="accept" ? ()=> acceptMentoring(mentoringId) : () => rejectMentoring(mentoringId)
    return useMutation(queryKey, queryFn, {
      onSuccess: onSuccess!,
      onError: onError!,
    })};

export  type ResponseMentoringType = "accept" | "reject"
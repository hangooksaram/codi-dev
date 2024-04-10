import { useGetMentoringAppliesQuery } from '@/queries/mentoring/mentorMentoringQuery';
import { GetMentoringAppliesResponseData } from '@/types/api/mentoring';
import { useEffect, useState } from 'react';

const useMentoringApplies = () => {
  const { data } = useGetMentoringAppliesQuery();
  const [applies, setApplies] = useState<
    GetMentoringAppliesResponseData[] | undefined
  >([]);

  useEffect(() => {
    if (data) {
      setApplies(
        [...data.data].filter(
          ({ datePassed, mentoringStatus }) =>
            !datePassed && mentoringStatus === 'APPLICATION',
        ),
      );
    }
  }, [data]);

  return { applies, setApplies };
};

export default useMentoringApplies;

'use client';

import { useEffect, useState } from 'react';
import MentorCenterApplyCard from '@/components/pages/mentorCenter/ApplyCard';
import { useGetMentoringAppliesQuery } from '@/queries/mentoring/mentorMentoringQuery';
import { GetMentoringAppliesResponseData } from '@/types/api/mentoring';
import Typography from '@/ui/atoms/Typography';
import LabelBox from '@/ui/molecules/LabelBox';
import theme from '@/ui/theme';
import useMentoringApplies from '@/hooks/mentorings/useMentoringApplies';

function ApplyPage() {
  const { applies, setApplies } = useMentoringApplies();

  if (applies?.length === 0) {
    return (
      <Typography variant="div" color={theme.colors.gray.main}>
        아직 들어온 멘토링 요청이 없어요
      </Typography>
    );
  }
  return (
    <LabelBox text="멘토링요청">
      {applies?.map(
        (
          { applicationDate, applicationReason, menteeInfo, mentoringId },
          index,
        ) => {
          return (
            <div key={index} style={{ marginBottom: '20px' }}>
              <MentorCenterApplyCard
                applicationDate={applicationDate!}
                applicationReason={applicationReason!}
                menteeInfo={menteeInfo!}
                mentoringId={mentoringId}
                setApplies={setApplies}
              />
            </div>
          );
        },
      )}
    </LabelBox>
  );
}

export default ApplyPage;

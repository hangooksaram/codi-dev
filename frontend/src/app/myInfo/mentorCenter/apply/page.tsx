"use client";

import MentorCenterApplyCard from "@/components/pages/mentorCenter/ApplyCard";
import MyInfoCommonContainerCard from "@/components/pages/myInfoCommon/MyInfoCommonContainerCard";
import { useMentoringApplies } from "@/queries/mentoring/mentorMentoringQuery";
import Typography from "@/ui/atoms/Typography";
import LabelBox from "@/ui/molecules/LabelBox";
import theme from "@/ui/theme";

const ApplyPage = () => {
  const { data, isLoading } = useMentoringApplies();

  if (data?.data.length === 0) {
    return (
      <Typography variant="div" color={theme.colors.gray.main}>
        아직 신청한 멘토링이 없어요.
      </Typography>
    );
  } else
    return (
      <LabelBox text="멘토링요청">
        <MyInfoCommonContainerCard>
          {data?.data.map(
            (
              { applicationDate, applicationReason, menteeInfo, mentoringId },
              index
            ) => {
              return (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <MentorCenterApplyCard
                    applicationDate={applicationDate!}
                    applicationReason={applicationReason!}
                    menteeInfo={menteeInfo!}
                    mentoringId={mentoringId}
                  />
                </div>
              );
            }
          )}
        </MyInfoCommonContainerCard>
      </LabelBox>
    );
};

export default ApplyPage;

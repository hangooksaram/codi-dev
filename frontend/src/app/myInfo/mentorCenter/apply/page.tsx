"use client";

import MentorCenterApplyCard from "@/components/pages/mentorCenter/ApplyCard";
import { selectUser } from "@/features/user/userSlice";
import { useMentoringApplies } from "@/queries/mentoring/mentorMentoringQuery";
import Card from "@/ui/atoms/Card";
import { FormLabel } from "@/ui/atoms/Label";
import LabelBox from "@/ui/molecules/LabelBox";
import theme from "@/ui/theme";
import { useSelector } from "react-redux";

const ApplyPage = () => {
  const { mentorId } = useSelector(selectUser);
  const { data } = useMentoringApplies(mentorId!);

  return (
    <LabelBox text="멘토링요청">
      <Card color={theme.colors.background} padding="40px">
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
      </Card>
    </LabelBox>
  );
};

export default ApplyPage;

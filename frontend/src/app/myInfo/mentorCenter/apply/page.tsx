"use client";

import MentorCenterApplyCard from "@/components/pages/mentorCenter/ApplyCard";
import MyInfoCommonContainerCard from "@/components/pages/myInfoCommon/MyInfoCommonContainerCard";
import { selectUser } from "@/features/user/userSlice";
import { useMentoringApplies } from "@/queries/mentoring/mentorMentoringQuery";
import LabelBox from "@/ui/molecules/LabelBox";
import { useSelector } from "react-redux";

const ApplyPage = () => {
  const { mentorId } = useSelector(selectUser);
  const { data } = useMentoringApplies(mentorId!);

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

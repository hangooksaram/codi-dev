"use client";

import MentorCenterApplyCard from "@/components/pages/mentorCenter/ApplyCard";
import Card from "@/ui/atoms/Card";
import { FormLabel } from "@/ui/atoms/Label";
import LabelBox from "@/ui/molecules/LabelBox";
import theme from "@/ui/theme";

const mocks = [
  {
    date: "6월 어쩌구 저쩌구",
    categories: ["1", "@"],
    introduction: "ddddd",
    menteeInfo: {
      name: "유희찬",
      job: "취준생",
      disability: "지체장애",
      severity: "중증",
    },
  },
  {
    date: "6월 어쩌구 저쩌구",
    categories: ["1", "@"],
    introduction: "ddddd",
    menteeInfo: {
      name: "유희찬",
      job: "취준생",
      disability: "지체장애",
      severity: "중증",
    },
  },
  {
    date: "6월 어쩌구 저쩌구",
    categories: ["1", "@"],
    introduction: "ddddd",
    menteeInfo: {
      name: "유희찬",
      job: "취준생",
      disability: "지체장애",
      severity: "중증",
    },
  },
  {
    date: "6월 어쩌구 저쩌구",
    categories: ["1", "@"],
    introduction: "ddddd",
    menteeInfo: {
      name: "유희찬",
      job: "취준생",
      disability: "지체장애",
      severity: "중증",
    },
  },
];

const ApplyPage = () => {
  return (
    <LabelBox text="멘토링요청">
      <Card color={theme.colors.background} padding="40px">
        {mocks.map(({ date, categories, introduction, menteeInfo }, index) => {
          return (
            <div key={index} style={{ marginBottom: "20px" }}>
              <MentorCenterApplyCard
                date={date}
                categories={categories}
                introduction={introduction}
                menteeInfo={menteeInfo}
              />
            </div>
          );
        })}
      </Card>
    </LabelBox>
  );
};

export default ApplyPage;

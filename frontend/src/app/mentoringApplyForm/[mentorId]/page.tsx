"use client";

import CalendarContainer from "@/components/Container/CalendarContainer";
import FlexBox from "@/ui/atoms/FlexBox";
import LabelBox from "@/ui/molecules/LabelBox";
import theme from "@/ui/theme";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useScheduleQuery from "@/queries/scheduleQuery";
import formattedDate from "@/utils/dateFormat";
import { Status } from "@/types/mentoring";
import Button from "@/ui/atoms/Button";
import FormInputContainer from "@/ui/molecules/Input/FormInput";
import Textarea from "@/ui/atoms/Textarea";
import ContainerWithBackground from "@/ui/molecules/Container/ContainerWithBackground";
import Typography from "@/ui/atoms/Typography";
import useRestForm from "@/hooks/useRestForm";
import ChipButton from "@/ui/atoms/ChipButton";

const mockData = [
  {
    date: formattedDate(new Date()),
    times: [
      {
        time: "10:00 - 10:50",
        status: "ACCEPTED" as Status,
      },
      {
        time: "11:00 - 11:50",
        status: "APPLICATION" as Status,
      },
      {
        time: "12:00 - 12:50",
        status: "APPLICATION" as Status,
      },
    ],
  },
][0];

interface MentoringApplyBody {
  profileId: number;
  date: string;
  time: string;
  mentorId: number;
  applicationReason: string;
}

const initialRestForm: MentoringApplyBody = {
  profileId: 0,
  date: "",
  time: "",
  mentorId: 0,
  applicationReason: "",
};

const MentoringApplyFormPage = () => {
  const { restForm, setRestForm } =
    useRestForm<MentoringApplyBody>(initialRestForm);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAllFilled, setIsAllFilled] = useState(false);
  const { mentorId } = useParams();
  const { data, refetch } = useScheduleQuery(formattedDate(date));

  const handleSubmit = () => {};

  useEffect(() => {
    setRestForm({ ...restForm, profileId: 1, mentorId: parseInt(mentorId) });
  }, []);

  useEffect(() => {
    if (date) {
      setRestForm({ ...restForm, date: formattedDate(date) });
      refetch();
    }
  }, [date]);
  return (
    <ContainerWithBackground>
      <Typography
        align="center"
        size={theme.fonts.size.lg}
        variant="h1"
        {...{ marginBottom: "80px" }}
      >
        멘토링 신청하기
      </Typography>
      <form onSubmit={handleSubmit}>
        <FlexBox direction="column" rowGap="60px">
          <LabelBox
            text="멘토링 시간 선택"
            helpText="원하는 시간과 멘토링 분야를 선택해주세요."
          >
            <CalendarContainer date={date} setDate={setDate} type="mentee">
              <Typography variant="div" {...{ marginBottom: "15px" }}>
                멘토링 가능 시간
              </Typography>
              <FlexBox
                isWrap
                justifyContent="flex-start"
                columnGap="15px"
                rowGap="15px"
              >
                {mockData.times.map(({ time, status }, index) => {
                  const scheduled = status === "ACCEPTED";
                  return (
                    <ChipButton
                      type="button"
                      onClick={() => setRestForm({ ...restForm, time })}
                      variant="default"
                      size="small"
                      color={
                        scheduled
                          ? theme.colors.white
                          : time === restForm.time
                          ? theme.colors.primary
                          : theme.colors.background
                      }
                      key={index}
                      outline={scheduled}
                      disabled={scheduled}
                    >
                      {time}
                    </ChipButton>
                  );
                })}
              </FlexBox>
            </CalendarContainer>
          </LabelBox>
          <FormInputContainer text="하고싶은 말" helpText="(최소 50 글자)">
            <Textarea
              value={restForm.applicationReason}
              onChange={(e) =>
                setRestForm({ ...restForm, applicationReason: e.target.value })
              }
            ></Textarea>
          </FormInputContainer>
          <Button
            disabled={
              !restForm.applicationReason || !restForm.date || !restForm.time
            }
            type="submit"
            variant="square"
          >
            멘토링 신청하기
          </Button>
        </FlexBox>
      </form>
    </ContainerWithBackground>
  );
};

export default MentoringApplyFormPage;

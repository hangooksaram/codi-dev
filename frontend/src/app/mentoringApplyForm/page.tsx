"use client";

import CalendarContainer from "@/components/Container/CalendarContainer";
import FlexBox from "@/ui/atoms/FlexBox";
import LabelBox from "@/ui/molecules/LabelBox";
import theme from "@/ui/theme";
import { FormEventHandler, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useDailySchedulesQuery, {
  useMonthlySchedulesQuery,
} from "@/queries/scheduleQuery";
import formattedDate from "@/utils/dateFormat";
import Button from "@/ui/atoms/Button";
import FormInputContainer from "@/ui/molecules/Input/FormInput";
import Textarea from "@/ui/atoms/Textarea";
import ContainerWithBackground from "@/ui/molecules/Container/ContainerWithBackground";
import Typography from "@/ui/atoms/Typography";
import useRestForm from "@/hooks/useForm";
import ChipButton from "@/ui/atoms/ChipButton";
import { selectUser } from "@/features/user/userSlice";
import { useSelector } from "react-redux";
import { useApplyMentoringMutation } from "@/queries/mentoring/menteeMentoringQuery";
import { ApplyMentoringBody } from "@/types/api/mentoring";

const initialRestForm: ApplyMentoringBody = {
  date: "",
  time: "",
  applicationReason: "",
};

const MentoringApplyFormPage = () => {
  const { restForm, setRestForm } =
    useRestForm<ApplyMentoringBody>(initialRestForm);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAllFilled, setIsAllFilled] = useState(false);
  const param = useSearchParams();
  const { profileId } = useSelector(selectUser);
  const mutation = useApplyMentoringMutation(
    profileId!,
    parseInt(param.get("mentorId")!)
  );
  const { data } = useDailySchedulesQuery(
    parseInt(param.get("mentorId")!),
    formattedDate(date)
  );

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    mutation.mutate(restForm!);
    e.preventDefault();
    router.push("/mentorsMain");
  };

  useEffect(() => {
    if (date) {
      setRestForm({ ...restForm, date: formattedDate(date) });
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
                {data?.times.map(({ time, enabled }, index) => {
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
                      outline={!enabled}
                      disabled={!enabled}
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
              minLength={50}
              value={restForm.applicationReason}
              onChange={(e) =>
                setRestForm({ ...restForm, applicationReason: e.target.value })
              }
            ></Textarea>
          </FormInputContainer>
          <Button
            disabled={
              restForm.applicationReason.length < 50 ||
              !restForm.date ||
              !restForm.time
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

'use client';

import { FormEventHandler, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import CalendarContainer from '@/components/Container/CalendarContainer';
import FlexBox from '@/ui/atoms/FlexBox';
import LabelBox from '@/ui/molecules/LabelBox';
import theme from '@/ui/theme';
import useDailySchedulesQuery, {
  useMonthlySchedulesQuery,
} from '@/queries/scheduleQuery';
import { formattedDate, formattedMonth } from '@/utils/dateFormat';
import Button from '@/ui/atoms/Button';
import ContentTextContainer from '@/ui/molecules/Container/ContentTextContainer';
import Textarea from '@/ui/atoms/Textarea';
import ContainerWithBackground from '@/ui/molecules/Container/ContainerWithBackground';
import Typography from '@/ui/atoms/Typography';
import useForm from '@/hooks/useForm';
import ChipButton from '@/ui/atoms/ChipButton';
import { selectUser } from '@/features/user/userSlice';
import { useApplyMentoringMutation } from '@/queries/mentoring/menteeMentoringQuery';
import { ApplyMentoringBody } from '@/types/api/mentoring';
import Label from '@/ui/atoms/Label';

const initialForm: ApplyMentoringBody = {
  date: '',
  time: '',
  applicationReason: '',
};

function MentoringApplyFormPage() {
  const { setForm, form } = useForm<ApplyMentoringBody>(initialForm);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<string>();
  const param = useSearchParams();

  const mutation = useApplyMentoringMutation(parseInt(param.get('mentorId')!));
  const { data } = useDailySchedulesQuery(
    formattedDate(date),
    parseInt(param.get('mentorId')!),
  );

  const { data: monthlySchedules } = useMonthlySchedulesQuery(
    formattedMonth(new Date()),
    parseInt(param.get('mentorId')!)!,
  );
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutation.mutate(form!);
    router.push('/mentorsMain');
  };

  useEffect(() => {
    if (date) {
      setForm({ ...form, date: formattedDate(date) });
    }
  }, [date]);
  return (
    <ContainerWithBackground>
      <Typography
        align="center"
        size={theme.fonts.size.lg}
        variant="h1"
        {...{ marginBottom: '80px' }}
      >
        멘토링 신청하기
      </Typography>
      <form onSubmit={handleSubmit}>
        <FlexBox direction="column" rowGap="60px">
          <LabelBox
            text="멘토링 시간 선택"
            helpText="원하는 시간과 멘토링 분야를 선택해주세요."
          >
            <CalendarContainer
              date={date}
              setDate={setDate}
              setMonth={setMonth}
              schedules={monthlySchedules?.days.map(({ date }) => date)!}
              type="mentee"
            >
              <Typography variant="div" {...{ marginBottom: '15px' }}>
                멘토링 가능 시간
              </Typography>
              <FlexBox
                isWrap
                justifyContent="flex-start"
                columnGap="15px"
                rowGap="15px"
              >
                {data?.times.map(({ time, enabled }, index) => {
                  const scheduled = status === 'ACCEPTED';
                  return (
                    <ChipButton
                      type="button"
                      onClick={() => setForm({ ...form, time })}
                      variant="default"
                      size="small"
                      color={
                        scheduled
                          ? theme.colors.white
                          : time === form.time
                            ? theme.colors.primary.main
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
          <ContentTextContainer text="하고싶은 말" helpText="(최소 50 글자)">
            <Label
              htmlFor="applicationReason"
              text="하고싶은 말 (최소 50 글자)"
            />
            <Textarea
              id="applicationReason"
              minLength={50}
              value={form.applicationReason}
              onChange={(e) =>
                setForm({ ...form, applicationReason: e.target.value })
              }
            />
          </ContentTextContainer>
          <Button
            disabled={
              form.applicationReason.length < 50 || !form.date || !form.time
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
}

export default MentoringApplyFormPage;

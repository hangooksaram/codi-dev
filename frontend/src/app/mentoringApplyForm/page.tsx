'use client';

import { FormEventHandler, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CalendarContainer from '@/components/Container/CalendarContainer';
import FlexBox from '@/ui/atoms/FlexBox';
import LabelBox from '@/ui/molecules/LabelBox';
import theme from '@/ui/theme';
import useDailySchedulesQuery, {
  useMonthlySchedulesQuery,
} from '@/queries/scheduleQuery';
import { formattedDate, formattedMonth } from '@/utils/dateFormat';
import Button from '@/ui/atoms/Button';
import Textarea from '@/ui/atoms/Textarea';
import Typography from '@/ui/atoms/Typography';
import useForm, { FormType, FormPropertyType } from '@/hooks/useForm/useForm';
import ChipButton from '@/ui/atoms/ChipButton';
import { useApplyMentoringMutation } from '@/queries/mentoring/menteeMentoringQuery';
import Label from '@/ui/atoms/Label';
import { useDispatch } from 'react-redux';
import { setCurrentModal, setModalState } from '@/features/modal/modalSlice';
import SinglePageLayout from '@/components/Layout/SinglePageLayout';
import Card from '@/ui/atoms/Card';
import { ApplyMentoringBody } from '@/types/api/mentoring';

export interface ApplyMentoringFormDataType extends FormType {
  applicationReason: FormPropertyType<string>;
  date: FormPropertyType<string>;
  time: FormPropertyType<string>;
}

const initialFormValues: ApplyMentoringFormDataType = {
  applicationReason: {
    validCondition: {
      required: true,
      minLength: 50,
    },
  },
  date: {
    validCondition: {
      required: true,
    },
  },
  time: {
    validCondition: {
      required: true,
    },
  },
};

function MentoringApplyFormPage() {
  const { form, handleFormValueChange, convertToFormData } =
    useForm(initialFormValues);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<string>();
  const param = useSearchParams();
  const dispatch = useDispatch();

  const mutation = useApplyMentoringMutation(
    parseInt(param.get('mentorId')!),
    () => {
      dispatch(
        setCurrentModal({
          type: 'confirm',
          text: '멘토링 신청이 성공되었습니다.',
        }),
      );
      dispatch(setModalState(true));
      router.push('/mentorsMain');
    },
  );
  const { data } = useDailySchedulesQuery({
    date: formattedDate(date),
    mentorId: parseInt(param.get('mentorId')!),
  });

  const { data: monthlySchedules } = useMonthlySchedulesQuery({
    month: formattedMonth(new Date()),
    mentorId: parseInt(param.get('mentorId')!)!,
  });
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formValues = convertToFormData<ApplyMentoringBody>();
    mutation.mutate(formValues!);
  };

  useEffect(() => {
    if (date) {
      handleFormValueChange({ name: 'date', value: formattedDate(date) });
    }
  }, [date]);

  return (
    <SinglePageLayout background={theme.colors.white}>
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
              <Card padding="40px">
                {data?.times.length! > 0 ? (
                  <Typography variant="div" {...{ marginBottom: '15px' }}>
                    멘토링 가능 시간
                  </Typography>
                ) : (
                  <Typography variant="div" {...{ marginBottom: '15px' }}>
                    등록된 멘토링 가능 시간이 없습니다
                  </Typography>
                )}

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
                        onClick={() =>
                          handleFormValueChange({ name: 'time', value: time })
                        }
                        variant="default"
                        size="small"
                        color={
                          scheduled
                            ? theme.colors.white
                            : time === form.time.value
                              ? theme.colors.primary.main
                              : theme.colors.background
                        }
                        key={index}
                        outline={!enabled}
                        disabled={!enabled}
                        hoverDisabled
                      >
                        {time}
                      </ChipButton>
                    );
                  })}
                </FlexBox>
              </Card>
            </CalendarContainer>
          </LabelBox>
          <LabelBox text="하고싶은 말" helpText="(최소 50 글자)">
            <Label
              htmlFor="applicationReason"
              text="하고싶은 말 (최소 50 글자)"
            />
            <Textarea
              id="applicationReason"
              minLength={50}
              value={form.applicationReason.value}
              name="applicationReason"
              onChange={handleFormValueChange}
            />
          </LabelBox>
          <Button
            disabled={
              form.applicationReason.value?.length < 50 ||
              !form.date.value ||
              !form.time.value
            }
            type="submit"
            variant="square"
          >
            멘토링 신청하기
          </Button>
        </FlexBox>
      </form>
    </SinglePageLayout>
  );
}

export default MentoringApplyFormPage;

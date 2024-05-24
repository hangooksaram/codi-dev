import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SCHEDULE_TIME_TABLE } from '@/constants';
import { selectUser } from '@/features/user/userSlice';
import { useScheduleMutation } from '@/queries/scheduleQuery';
import { Schedule, ScheduleTime } from '@/types/schedule';

import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import { SetState } from '@/index';
import useInitializeScheduleTimeTables from '@/hooks/schedules/useInitializeScheduleTimeTables';

function MentorScheduleEdit({
  date,
  schedules,
  toggleEditState,
  setIsScheduleEdited,
}: {
  date?: string;
  schedules?: Schedule;
  toggleEditState: () => void;
  setIsScheduleEdited: SetState<number>;
}) {
  const [selectedSchedules, setSelectedSchedules] = useState<ScheduleTime[]>(
    [],
  );

  const { scheduleTimeTables } = useInitializeScheduleTimeTables(
    SCHEDULE_TIME_TABLE,
    date!,
  );

  useEffect(() => {
    setSelectedSchedules(schedules?.times!);
  }, [date, schedules?.times]);

  const selected = (time: string) => {
    return selectedSchedules?.find(
      ({ time: selectedTime }) => selectedTime === time,
    );
  };

  const handleClickTime = (time: string) => {
    if (
      selectedSchedules?.find(({ time: selectedTime }) => selectedTime === time)
    ) {
      setSelectedSchedules((prev) =>
        prev.filter((prevTime) => prevTime.time !== time),
      );
      return;
    }
    setSelectedSchedules([...selectedSchedules, { time, enabled: true }]);
  };

  const addSchedule = useScheduleMutation({
    onSuccess: () => setIsScheduleEdited((prev) => prev + 1),
  });

  const patchMentorSchedule = () => {
    toggleEditState();
    const times: ScheduleTime[] = selectedSchedules.map(({ time }) => {
      return { time };
    });
    addSchedule.mutate({ date: date!, times: times! });
  };

  const deleteAllSchedule = () => {
    setSelectedSchedules((prev) => prev.filter((p) => !p.enabled));
  };

  return (
    <Card padding="45px">
      <FlexBox direction="column" rowGap="23px">
        <FlexBox justifyContent="flex-start" columnGap="20px">
          <Typography variant="div">시간 선택</Typography>
          <Button
            onClick={deleteAllSchedule}
            variant="default"
            outline
            size="small"
            color={theme.colors.white}
          >
            전체 삭제
          </Button>
        </FlexBox>

        <FlexBox
          isWrap
          rowGap="15px"
          columnGap="15px"
          justifyContent="flex-start"
        >
          {scheduleTimeTables.map((time, index) => (
            <Button
              onClick={() => handleClickTime(time)}
              color={
                selected(time)
                  ? theme.colors.primary.normal
                  : theme.colors.white
              }
              variant="default"
              size="small"
              outline
              key={`${index}-${time}`}
              disabled={
                selected(time)?.time === time && !selected(time)?.enabled
              }
            >
              {time}
            </Button>
          ))}
        </FlexBox>
        <Button
          // disabled={selectedSchedules?.length === 0}
          onClick={patchMentorSchedule}
          size="small"
          variant="default"
        >
          변경내용저장
        </Button>
      </FlexBox>
    </Card>
  );
}

export default MentorScheduleEdit;

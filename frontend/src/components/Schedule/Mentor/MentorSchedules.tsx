import { css } from '@emotion/css';
import { Schedule } from '@/types/schedule';
import Card from '@/ui/atoms/Card';
import Chip from '@/ui/atoms/Chip';
import FlexBox from '@/ui/atoms/FlexBox';
import theme from '@/ui/theme';

function MentorSchedules({ schedules }: { schedules: Schedule | Schedule[] }) {
  return Array.isArray(schedules) ? (
    <MonthlySchedules schedules={schedules} />
  ) : (
    <DailySchedules schedules={schedules} />
  );
}

function MonthlySchedules({ schedules }: { schedules: Schedule[] }) {
  return (
    <Card padding="45px">
      {schedules?.map(({ date, times }, index) => {
        return (
          <div
            className={css({ width: '100%', marginBottom: '30px' })}
            key={`monthly-schedule-${date}-${index}`}
          >
            <div>{date}</div>
            <FlexBox
              justifyContent="flex-start"
              isWrap
              columnGap="20px"
              rowGap="20px"
              {...{ marginTop: '15px' }}
            >
              {times.map(({ time, enabled }) => (
                <Chip
                  color={
                    enabled ? theme.colors.white : theme.colors.primary.normal
                  }
                  fontColor={
                    enabled ? theme.colors.gray.main : theme.colors.white
                  }
                  outline
                  key={`monthly-schedule-time-${time}-${index}`}
                >
                  {time}
                </Chip>
              ))}
            </FlexBox>
          </div>
        );
      })}
    </Card>
  );
}

function DailySchedules({ schedules }: { schedules?: Schedule }) {
  return (
    <Card padding="45px">
      <div className={css({ width: '100%', marginBottom: '30px' })}>
        <div>{schedules?.date}</div>
        <FlexBox
          justifyContent="flex-start"
          isWrap
          columnGap="20px"
          rowGap="20px"
          {...{ marginTop: '15px' }}
        >
          {schedules?.times.map(({ time, enabled }, index) => (
            <Chip
              color={enabled ? theme.colors.white : theme.colors.primary.normal}
              fontColor={enabled ? theme.colors.gray.main : theme.colors.white}
              outline
              key={index}
            >
              {time}
            </Chip>
          ))}
        </FlexBox>
      </div>
    </Card>
  );
}

export default MentorSchedules;

import { formattedDate } from '@/utils/dateFormat';
import { useEffect, useState } from 'react';

const useInitializeScheduleTimeTables = (
  SCHEDULE_TIME_TABLE: string[],
  date: string,
) => {
  const [scheduleTimeTables, setScheduleTimeTables] =
    useState(SCHEDULE_TIME_TABLE);
  const isPassedDate =
    parseInt(date.split('/')[2]) <=
    parseInt(formattedDate(new Date()).split('/')[2]);

  useEffect(() => {
    if (isPassedDate) {
      const passedTimeTableIndex = scheduleTimeTables.findIndex((table) => {
        return (
          parseInt(table.split(':')[0]) >=
          parseInt(new Date().toTimeString().split(':')[0])
        );
      });

      setScheduleTimeTables((prev) =>
        prev.filter((_, index) => index > passedTimeTableIndex),
      );
      return () => setScheduleTimeTables(SCHEDULE_TIME_TABLE);
    }
  }, [date]);

  return { scheduleTimeTables };
};

export default useInitializeScheduleTimeTables;

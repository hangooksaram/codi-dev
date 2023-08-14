import Chip from "@/ui/atoms/Chip";
import MentoringCard from "./MentoringCard";
import FlexBox from "@/ui/atoms/FlexBox";
import theme from "@/ui/theme";
import { css } from "@emotion/css";
import { DailyMentoringMember, MentoringMember } from "@/types/mentoring";
import formattedDate from "@/utils/dateFormat";

const Mentorings = ({
  mentorings,
}: {
  mentorings: DailyMentoringMember[] | DailyMentoringMember;
}) => {
  const today = (date: string) => {
    return date === formattedDate(new Date());
  };

  if (Array.isArray(mentorings))
    return mentorings?.map(({ date, mentoringMembers }, index) => {
      return (
        <div
          className={css({ width: "100%", marginBottom: "30px" })}
          key={index}
        >
          <Chip
            color={today(date) ? theme.colors.primary : theme.colors.gray.main}
            fontColor={today(date) ? theme.colors.white : theme.colors.primary}
          >
            {date}
          </Chip>

          <FlexBox
            justifyContent="flex-start"
            isWrap
            columnGap="20px"
            rowGap="20px"
            {...{ marginTop: "10px" }}
          >
            {mentoringMembers?.map(
              ({ time, name, mentoringJob, mentoringId, platform }) => (
                <MentoringCard
                  mentoringId={mentoringId}
                  date={date}
                  time={time}
                  name={name}
                  mentoringJob={mentoringJob}
                  platform={platform}
                  key={index}
                />
              )
            )}
          </FlexBox>
        </div>
      );
    });
  else
    return (
      <div className={css({ width: "100%", marginBottom: "30px" })}>
        {mentorings?.mentoringMembers.length > 0 ? (
          <Chip
            color={
              today(mentorings?.date)
                ? theme.colors.primary
                : theme.colors.gray.main
            }
            fontColor={
              today(mentorings?.date)
                ? theme.colors.white
                : theme.colors.primary
            }
          >
            {mentorings?.date}
          </Chip>
        ) : (
          <div>예정된 멘토링이 없습니다.</div>
        )}

        <FlexBox
          justifyContent="flex-start"
          isWrap
          columnGap="20px"
          rowGap="20px"
          {...{ marginTop: "10px" }}
        >
          {mentorings?.mentoringMembers?.map(
            ({ time, name, mentoringJob, mentoringId, platform }, index) => (
              <MentoringCard
                mentoringId={mentoringId}
                date={mentorings?.date}
                time={time}
                name={name}
                mentoringJob={mentoringJob}
                platform={platform}
                key={index}
              />
            )
          )}
        </FlexBox>
      </div>
    );
};

const chipColor = (today: boolean) => {
  return today ? theme.colors.primary : theme.colors.gray.main;
};

export default Mentorings;

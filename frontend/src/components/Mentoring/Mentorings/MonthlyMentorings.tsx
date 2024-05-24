import { DailyMentoringMember } from '@/types/mentoring';
import Chip from '@/ui/atoms/Chip';
import FlexBox from '@/ui/atoms/FlexBox';
import { today } from '@/utils/dateFormat';
import { css } from '@emotion/css';
import MentoringCard from '../MentoringCard';
import theme from '@/ui/theme';
import { MonthlyMentoringMembersContainer } from './Mentorings.styled';

const MonthlyMentorings = ({
  mentorings,
}: {
  mentorings: DailyMentoringMember[];
}) => {
  return mentorings?.map(({ date, mentoringMembers }, index) => {
    return (
      <div
        className={css({ width: '100%', marginBottom: '30px' })}
        key={`mentoring-container-${index}-${new Date().toUTCString()}`}
      >
        <Chip
          color={
            today(date) ? theme.colors.primary.normal : theme.colors.gray.main
          }
          fontColor={
            today(date) ? theme.colors.white : theme.colors.primary.normal
          }
        >
          {date}
        </Chip>
        <MonthlyMentoringMembersContainer
          justifyContent="flex-start"
          isWrap
          columnGap="20px"
          rowGap="20px"
          {...{ marginTop: '10px' }}
        >
          {mentoringMembers?.map(
            ({
              time,
              name,
              mentoringJob,
              mentoringId,
              platform,
              profileId,
              mentorId,
              imgUrl,
            }) => (
              <MentoringCard
                profileId={profileId}
                mentorId={mentorId}
                mentoringId={mentoringId}
                date={date}
                time={time}
                name={name}
                mentoringJob={mentoringJob}
                platform={platform}
                imgUrl={imgUrl}
                key={`mentoring-member-${mentoringId}-${index}`}
              />
            ),
          )}
        </MonthlyMentoringMembersContainer>
      </div>
    );
  });
};

export default MonthlyMentorings;

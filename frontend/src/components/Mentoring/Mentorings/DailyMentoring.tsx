import { DailyMentoringMember } from '@/types/mentoring';
import Chip from '@/ui/atoms/Chip';
import FlexBox from '@/ui/atoms/FlexBox';
import theme from '@/ui/theme';
import { today } from '@/utils/dateFormat';
import { css } from '@emotion/css';
import MentoringCard from '../MentoringCard';

const DailyMentoring = ({
  mentorings,
}: {
  mentorings: DailyMentoringMember;
}) => (
  <div className={css({ width: '100%', marginBottom: '30px' })}>
    {mentorings?.mentoringMembers.length > 0 ? (
      <Chip
        color={
          today(mentorings?.date)
            ? theme.colors.primary.normal
            : theme.colors.gray.main
        }
        fontColor={
          today(mentorings?.date)
            ? theme.colors.white
            : theme.colors.primary.normal
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
      {...{ marginTop: '10px' }}
    >
      {mentorings?.mentoringMembers?.map(
        (
          {
            time,
            name,
            mentoringJob,
            mentoringId,
            platform,
            profileId,
            mentorId,
            imgUrl,
          },
          index,
        ) => (
          <MentoringCard
            imgUrl={imgUrl}
            profileId={profileId}
            mentorId={mentorId}
            mentoringId={mentoringId}
            date={mentorings?.date}
            time={time}
            name={name}
            mentoringJob={mentoringJob}
            platform={platform}
            key={index}
          />
        ),
      )}
    </FlexBox>
  </div>
);

export default DailyMentoring;

import FlexBox from '@/ui/atoms/FlexBox';
import ProfileStatusCard from '../ProfileStatusCard/ProfileStatusCard';

function MentorStatus({
  mentoringCount,
  responseRate,
}: {
  mentoringCount?: number;
  responseRate?: number;
}) {
  return (
    <FlexBox
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      rowGap="4px"
    >
      {[
        { text: '멘토링 횟수', value: `${mentoringCount ?? 0}회` },
        { text: '응답률', value: `${responseRate ?? 0}%` },
      ].map(({ text, value }, index) => (
        <ProfileStatusCard text={text} value={value} key={index} />
      ))}
    </FlexBox>
  );
}

export default MentorStatus;

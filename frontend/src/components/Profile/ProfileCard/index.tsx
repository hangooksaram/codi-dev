import styled from '@emotion/styled';
import Card from '@/ui/atoms/Card';
import FlexBox from '@/ui/atoms/FlexBox';
import { ProfileCardProps } from '@/types/profile';
import theme, { device } from '@/ui/theme';

function ProfileCard({ width, height, children }: ProfileCardProps) {
  return (
    <CardContainer width={width} height={height} padding="10px 10px 40px 10px">
      <FlexBox
        direction="column"
        justifyContent="space-between"
        rowGap="24px"
        {...{ height: '100%', position: 'relative' }}
      >
        {children}
      </FlexBox>
    </CardContainer>
  );
}

const CardContainer = styled(Card)(({ width }: { width?: string }) => ({
  minWidth: width!,
  background: theme.colors.white,
  [device('mdWeb')]: {
    backgroundPosition: 'top',
  },
  [device('tablet')]: {
    width: '100%',
  },
  backgroundPosition: 'center',
  backgroundSize: 'cover',

  borderColor: '#D2E6FE',
  padding: '24px',
}));

export default ProfileCard;

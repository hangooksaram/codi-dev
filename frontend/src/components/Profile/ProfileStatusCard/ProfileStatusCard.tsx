import Card from '@/ui/atoms/Card';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme from '@/ui/theme';
import styled from '@emotion/styled';

const ProfileStatusCard = ({
  text,
  value,
}: {
  text: string;
  value: string;
}) => (
  <StyledProfileStatusCard width="100%">
    <FlexBox justifyContent="space-between">
      <Typography variant="div" color={theme.colors.gray.main}>
        {text}
      </Typography>
      <Typography
        variant="div"
        size={theme.fonts.size.md}
        color={theme.colors.primary.normal}
        weight={theme.fonts.weight.extraBold}
      >
        {value}
      </Typography>
    </FlexBox>
  </StyledProfileStatusCard>
);

const StyledProfileStatusCard = styled(Card)(({}) => ({
  backgroundColor: theme.colors.background,
  height: 'auto',
  border: 'none',
  padding: '20px',
}));

export default ProfileStatusCard;

import { useRouter } from 'next/navigation';
import Button from '@/ui/atoms/Button';
import FlexBox from '@/ui/atoms/FlexBox';
import StyledLink from '@/ui/atoms/Link';
import Typography from '@/ui/atoms/Typography';
import theme, { device } from '@/ui/theme';
import { sendGAEvent } from '@next/third-parties/google';
import { trackGAEvent } from '@/components/GoogleAnalytics/GoogleAnalyticsWithLibrary/googlaAnalytics';

function NonUserAppBarMenu() {
  const router = useRouter();

  return (
    <FlexBox
      justifyContent="flex-end"
      columnGap="30px"
      {...{
        [device('smWeb')]: {
          justifyContent: 'space-between',
        },
      }}
    >
      <StyledLink
        href="/signup"
        onClick={() => {
          trackGAEvent('My Category', 'My Action', 'My Label');
        }}
      >
        아이디가 없으신가요?
        <Typography
          variant="span"
          size={theme.fonts.size.sm}
          weight={theme.fonts.weight.bold}
          {...{ marginLeft: '4px' }}
        >
          회원가입
        </Typography>
      </StyledLink>
      <Button
        size="small"
        variant="default"
        color={theme.colors.primary.main}
        {...{ height: '39px' }}
        onClick={() => router.push('/signin')}
      >
        로그인
      </Button>
    </FlexBox>
  );
}

export default NonUserAppBarMenu;

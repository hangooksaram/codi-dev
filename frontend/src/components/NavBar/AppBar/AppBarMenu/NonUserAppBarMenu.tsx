import { useRouter } from 'next/navigation';
import Button from '@/ui/atoms/Button';
import FlexBox from '@/ui/atoms/FlexBox';
import Typography from '@/ui/atoms/Typography';
import theme, { device } from '@/ui/theme';
import Link from 'next/link';

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
      <Link href="/signup">
        <Typography variant="span">아이디가 없으신가요?</Typography>
        <Typography
          variant="span"
          size={theme.fonts.size.sm}
          weight={theme.fonts.weight.bold}
          {...{ marginLeft: '4px' }}
        >
          회원가입
        </Typography>
      </Link>
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

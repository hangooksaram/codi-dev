'use client';

import { useRouter } from 'next/navigation';
import signUpCompleteImage from '@images/sign-up-complete.png';
import Container from '@/ui/atoms/Container';
import Typography from '@/ui/atoms/Typography';
import Button from '@/ui/atoms/Button';
import theme from '@/ui/theme';
import FlexBox from '@/ui/atoms/FlexBox';
import ImageComponent from '@/ui/atoms/ImageComponent';
import Link from 'next/link';

function CompletePage() {
  const router = useRouter();
  return (
    <Container>
      <FlexBox
        direction="column"
        alignItems="center"
        rowGap="20px"
        justifyContent="center"
        {...{ height: 'calc(100vh - 59px)' }}
      >
        <ImageComponent
          width="70%"
          height="auto"
          src={signUpCompleteImage}
          alt="회원가입 완료"
        />

        <Typography variant="div">
          딱 맞는 멘토 매칭을 위해서 조금만 더 알려주세요!
        </Typography>
        <Button
          onClick={() => {
            router.replace('/profileForm');
          }}
          variant="default"
          color={theme.colors.primary.normal}
        >
          프로필 작성하기
        </Button>
        <Link href="/">
          <Typography variant="div">나중에 할게요</Typography>
        </Link>
      </FlexBox>
    </Container>
  );
}

export default CompletePage;

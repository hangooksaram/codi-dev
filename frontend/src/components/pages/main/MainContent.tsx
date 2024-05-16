'use client';

import { css } from '@emotion/css';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Recommendation from '@/components/pages/mentorsMain/Recommendation';
import Typography from '@/ui/atoms/Typography';
import Button from '@/ui/atoms/Button';
import theme, { device } from '@/ui/theme';
import FlexBox from '@/ui/atoms/FlexBox';
import { selectUser } from '@/features/user/userSlice';
import TodayMentoring from '@/components/pages/main/TodayMentoring';
import landingBanner from '../../../../public/images/landing-banner.png';
import { BackgroundImage } from '@/ui/molecules/Image/BackgroundImage';
import Footer from '@/components/pages/main/Footer';
import Container from '@/ui/atoms/Container';
import styled from '@emotion/styled';
import MobileAppBar from '@/components/NavBar/AppBar/MobileAppBar';

/**deployment test .*/

function MainContent() {
  const router = useRouter();
  const user = useSelector(selectUser);

  return (
    <MainContainer width="100%">
      <MobileAppBar />
      <FlexBox direction="column" rowGap="20px" justifyContent="flex-start">
        <BackgroundImage
          image={{
            width: '100%',
            height: 'auto',
            alt: '나와 같은 어려움을 겪고 있는 멘티의 멘토가 되어주세요.',
            src: landingBanner,
          }}
          {...{
            display: 'flex',
            minHeight: '200px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            [device('mobile')]: {
              img: {
                display: 'none',
              },
            },
          }}
        >
          <FlexBox
            direction="column"
            justifyContent="center"
            alignItems="center"
            {...{
              [device('tablet')]: {
                width: '90%',
                margin: '0 auto',
              },
            }}
          >
            <Typography
              variant="h1"
              size={theme.fonts.size.xl}
              align="center"
              {...{
                minWidth: '0px',
                width: '500px',
                marginBottom: '10px',
                [device('tablet')]: {
                  minWidth: 'fit-content',
                  width: 'auto',
                  fontSize: `${theme.fonts.size.lg}`,
                  marginBottom: '10px',
                },
              }}
              wordBreak="keep-all"
              weight={theme.fonts.weight.black}
            >
              SHARE THE SAME EXPERIENCE
            </Typography>

            <Typography
              variant="div"
              align="center"
              {...{
                marginBottom: '40px',
                [device('tablet')]: {
                  marginBottom: '10px',
                },
              }}
            >
              나와 같은 어려움을 겪고 있는 멘티의 멘토가 되어주세요.
            </Typography>
            {!user.isMentor ? (
              <Button
                onClick={() => {
                  router.push('/mentorRegisterForm');
                }}
                variant="default"
                size="small"
              >
                멘토 신청하러 가기
              </Button>
            ) : null}
          </FlexBox>
        </BackgroundImage>
        {user.id && <TodayMentoring />}
        <Recommendation />
        <Footer />
      </FlexBox>
    </MainContainer>
  );
}

const MainContainer = styled(Container)(() => ({
  [device('tablet')]: {
    width: '100%',
  },
}));

export default MainContent;

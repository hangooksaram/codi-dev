"use client";

import Recommendation from "@/components/pages/mentorsMain/Recommendation";
import styled from "@emotion/styled";
import { backgroundImage } from "@/ui/atoms/BackgroundImage";
import Typography from "@/ui/atoms/Typography";
import Button from "@/ui/atoms/Button";
import theme, { device } from "@/ui/theme";
import { css } from "@emotion/css";

import { useRouter } from "next/navigation";
import StyledImage from "@/ui/atoms/StyledImage";
import FlexBox from "@/ui/atoms/FlexBox";
import { selectUser } from "@/features/user/userSlice";
import { useSelector } from "react-redux";
import TodayMentoring from "@/components/pages/main/TodayMentoring";
import landingBanner from "../../public/images/landing-banner.png";
import mainLandingBottom from "../../public/images/main-landing-bottom.png";
import { BackgroundImage } from "@/ui/molecules/Image/BackgroundImage";
import ImageComponent from "@/ui/atoms/ImageComponent";

const MainLandingPage = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const goToApply = () => {
    if (!user.id) router.push("/signin");
    else if (user.profileId) router.push("/mentorRegisterForm");
    else router.push("/profileForm");
  };

  return (
    <>
      <FlexBox direction="column" rowGap="20px">
        <BackgroundImage
          image={{
            width: "100%",
            height: "auto",
            alt: "나와 같은 어려움을 겪고 있는 멘티의 멘토가 되어주세요.",
            src: landingBanner,
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlexBox
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h1"
              size={theme.fonts.size.xl}
              align="center"
              {...{
                minWidth: "0px",
                width: "500px",
                marginBottom: "10px",
                [device("tablet")]: {
                  minWidth: "fit-content",
                  width: "auto",
                },
              }}
              wordBreak="keep-all"
            >
              SHARE THE SAME EXPERIENCE
            </Typography>

            <Typography variant="div" {...{ marginBottom: "40px" }}>
              나와 같은 어려움을 겪고 있는 멘티의 멘토가 되어주세요.
            </Typography>
            {!user.mentorId ? (
              <Button
                onClick={() => {
                  router.push("/mentorRegisterForm");
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
        <div
          className={css({
            width: "100%",
            [device("tablet")]: {
              display: "none",
            },
          })}
        >
          <ImageComponent
            width="100%"
            height="auto"
            src={mainLandingBottom}
            alt="main-landing-bottom"
          />
        </div>
      </FlexBox>
    </>
  );
};

const MainBanner = styled.div(({ src }: { src: string }) => ({
  ...backgroundImage(src),
  width: "100%",
  height: "auto",
  padding: "10%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [device("tablet")]: {
    padding: "0px",
  },
}));

export default MainLandingPage;

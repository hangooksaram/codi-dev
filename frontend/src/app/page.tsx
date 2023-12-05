"use client";

import Recommendation from "@/components/pages/mentorsMain/Recommendation";
import Typography from "@/ui/atoms/Typography";
import Button from "@/ui/atoms/Button";
import theme, { device } from "@/ui/theme";
import { css } from "@emotion/css";
import { useRouter } from "next/navigation";
import FlexBox from "@/ui/atoms/FlexBox";
import { selectUser } from "@/features/user/userSlice";
import { useSelector } from "react-redux";
import TodayMentoring from "@/components/pages/main/TodayMentoring";
import landingBanner from "../../public/images/landing-banner.png";
import { BackgroundImage } from "@/ui/molecules/Image/BackgroundImage";
import Footer from "@/components/pages/main/Footer";
import Dropdown from "@/ui/atoms/Dropdown";
import { useState } from "react";
import Input from "@/ui/atoms/Input";
import { MOBILE_NAVIGATION_HEIGHT } from "@/constants";

const MainLandingPage = () => {
  const router = useRouter();
  const user = useSelector(selectUser);

  const [test, setTest] = useState<string>("");

  return (
    <>
      <FlexBox
        {...{
          height: "auto",
          [device("tablet")]: {
            paddingBottom: `${MOBILE_NAVIGATION_HEIGHT}px`,
          },
        }}
        direction="column"
        rowGap="20px"
      >
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
              weight={theme.fonts.weight.black}
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
        <Footer />
      </FlexBox>
    </>
  );
};

export default MainLandingPage;

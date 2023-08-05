"use client";

import Recommendation from "@/components/pages/mentorsMain/Recommendation";
import useGetMentorsQuery, { GET_MENTORS_KEY } from "@/queries/mentorQuery";
import { Mentor } from "@/types/api/payload/mentor";
import styled from "@emotion/styled";
import { backgroundImage } from "@/ui/atoms/BackgroundImage";
import Typography from "@/ui/atoms/Typography";
import Button from "@/ui/atoms/Button";
import theme from "@/ui/theme";
import { css } from "@emotion/css";

import { useRouter } from "next/navigation";
import { StyledImage } from "@/ui/atoms/StyledImage";
import FlexBox from "@/ui/atoms/FlexBox";
import { isUser } from "@/utils/tempUser";

const MainLandingPage = () => {
  const router = useRouter();
  return (
    <>
      <FlexBox direction="column" rowGap="20px">
        <MainBanner src={"/images/landing-banner.png"}>
          <div
            className={css`
              width: 460px;
              word-break: break-word;
              margin-bottom: 10px;
            `}
          >
            <Typography variant="h1" size={theme.fonts.size.xl} align="center">
              SHARE THE SAME EXPERIENCE
            </Typography>
          </div>
          <Typography variant="div" {...{ marginBottom: "40px" }}>
            나와 같은 어려움을 겪고 있는 멘티의 멘토가 되어주세요.
          </Typography>
          <Button
            onClick={() => {
              if (isUser()) {
                router.push("/mentorApplyForm");
                return;
              }
              router.push("/signup");
            }}
            variant="default"
          >
            멘토 신청하러 가기
          </Button>
        </MainBanner>
        {/* <Recommendation mentors={recommendationMentors} /> */}
        <StyledImage
          width="100%"
          height="2300px"
          {...{ minHeight: "1900px" }}
          src="/images/main-landing-bottom.png"
          alt="main-landing-bottom"
        />
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
}));

export default MainLandingPage;

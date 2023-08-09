"use client";

import Recommendation from "@/components/pages/mentorsMain/Recommendation";
import useGetMentorsQuery, { GET_MENTORS_KEY } from "@/queries/mentorQuery";
import styled from "@emotion/styled";
import { backgroundImage } from "@/ui/atoms/BackgroundImage";
import Typography from "@/ui/atoms/Typography";
import Button from "@/ui/atoms/Button";
import theme from "@/ui/theme";
import { css } from "@emotion/css";

import { useRouter } from "next/navigation";
import { StyledImage } from "@/ui/atoms/StyledImage";
import FlexBox from "@/ui/atoms/FlexBox";
import { selectUser } from "@/features/user/userSlice";
import { useSelector } from "react-redux";

const MainLandingPage = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const goToApply = () => {
    if (!user.id) router.push("/signin");
    else if (user.profileId) router.push("/mentorApplyForm");
    else router.push("/profileForm");
  };
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
          {!user.mentorId ? (
            <Button
              onClick={() => {
                router.push("/mentorApplyForm");
              }}
              variant="default"
            >
              멘토 신청하러 가기
            </Button>
          ) : null}
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

"use client";

import { selectUser } from "@/features/user/userSlice";
import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import { StyledImage } from "@/ui/atoms/StyledImage";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MentorCenterPage = () => {
  const router = useRouter();
  const mentorId = useSelector(selectUser).mentorId;
  useEffect(() => {
    if (mentorId) redirect("profile");
  }, []);
  return (
    <FlexBox direction="column" rowGap="20px" {...{ minHeight: "500px" }}>
      <StyledImage
        src="/images/for-not-mentor.png"
        alt="for-not-mentor"
        width="360px"
        height="101px"
      />

      <Typography
        variant="h1"
        size={theme.fonts.size.xl}
        weight={theme.fonts.weight.black}
        align="center"
      >
        SHARE YOUR EXPERIENCE
      </Typography>
      <Typography variant="div" size={theme.fonts.size.md}>
        멘티를 가장 잘 이해하는 멘토가 되어주세요
      </Typography>
      <Button variant="default" onClick={() => router.push("/mentorApplyForm")}>
        멘토 신청하기
      </Button>
    </FlexBox>
  );
};

export default MentorCenterPage;

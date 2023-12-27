"use client";

import { selectUser } from "@/features/user/userSlice";
import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import ImageComponent from "@/ui/atoms/ImageComponent";
import StyledImage from "@/ui/atoms/StyledImage";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import forNotMentor from "../../../public/images/for-not-mentor.png";

const MentorCenterPage = () => {
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.isMentor) router.replace("/mentorCenter/profile/");
  }, []);
  return (
    <FlexBox direction="column" rowGap="20px" {...{ minHeight: "500px" }}>
      <ImageComponent
        src={forNotMentor}
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
      <Button
        variant="default"
        onClick={() => router.push("/mentorRegisterForm")}
      >
        멘토 신청하기
      </Button>
    </FlexBox>
  );
};

export default MentorCenterPage;

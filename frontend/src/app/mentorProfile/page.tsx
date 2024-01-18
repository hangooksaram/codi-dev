"use client";

import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import MentorProfile from "@/components/Profile/MentorProfile";
import ProfileCard from "@/components/Profile/ProfileCard";
import Content from "@/components/Profile/ProfileCard/Content";
import { useGetMentorQuery } from "@/queries/mentorQuery";
import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme, { device } from "@/ui/theme";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useRouter, useSearchParams } from "next/navigation";

const MentorProfilePage = () => {
  const router = useRouter();
  const param = useSearchParams();

  const mentorId = parseInt(param.get("mentorId")!);
  const isMentoringApplied = param.get("mentoringId");

  const { data: mentor, isSuccess } = useGetMentorQuery(mentorId);
  return (
    isSuccess && (
      <MentorProfile mentor={mentor!}>
        <ProfileCard width="313px">
          <Content.Container>
            <Content.Avatar imgUrl={mentor?.imgUrl} />
            <Content.Name name={mentor?.name!} />
            <Content.Job job={mentor?.job!} />
            <Content.Rating star={mentor?.star!} mentees={mentor?.mentees!} />
            <Content.Tags
              career={mentor?.career}
              disability={mentor?.disability!}
              severity={mentor?.severity!}
            />
          </Content.Container>
          {!isMentoringApplied && (
            <Button
              onClick={() =>
                router.push(`/mentoringApplyForm?mentorId=${mentorId}`)
              }
              size="small"
              variant="default"
              color={theme.colors.secondary.main}
              {...{ marginTop: "20px" }}
            >
              멘토링 신청하기
            </Button>
          )}
        </ProfileCard>
      </MentorProfile>
    )
  );
};

export default MentorProfilePage;

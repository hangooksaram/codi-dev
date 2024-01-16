"use client";

import MenteeProfile from "@/components/Profile/MenteeProfile";
import ProfileCard, { Footer } from "@/components/Profile/ProfileCard";
import Content from "@/components/Profile/ProfileCard/Content";
import Header from "@/components/Profile/ProfileCard/Header";
import { selectUser } from "@/features/user/userSlice";
import useGetProfileQuery from "@/queries/profileQuery";
import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const MyInfoPage = () => {
  const isProfile = useSelector(selectUser).isProfile;
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  const router = useRouter();

  if (isLoading) {
    if (!isProfile) {
      return (
        <FlexBox direction="column" rowGap="30px">
          <Typography variant="div" color={theme.colors.gray.main}>
            아직 프로필이 작성되지 않았습니다.
          </Typography>
          <Button variant="default" onClick={() => router.push("/profileForm")}>
            프로필 작성하러 가기
          </Button>
        </FlexBox>
      );
    }
    return <>로딩 중</>;
  }
  if (isError) {
    return <>error</>;
  }

  return (
    <MenteeProfile profile={profile}>
      <ProfileCard width="313px" height="477px">
        <Content.Container>
          <Content.Avatar imgUrl={profile?.imgUrl} />
          <Content.Name name={profile?.name!} />
          <Content.EmploymentStatus
            employmentStatus={profile?.employmentStatus!}
          />
          <Content.Job job={profile?.job!} />
        </Content.Container>
        <Footer>
          <Button
            onClick={() => router.push("/profileForm?edit=true")}
            size="small"
            variant="default"
            color={theme.colors.secondary}
          >
            프로필 수정하기
          </Button>
        </Footer>
      </ProfileCard>
    </MenteeProfile>
  );
};

export default MyInfoPage;

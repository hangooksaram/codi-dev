"use client";

import MenteeProfile from "@/components/Profile/MenteeProfile";
import { selectUser } from "@/features/user/userSlice";
import useGetProfileQuery from "@/queries/profileQuery";
import Button from "@/ui/atoms/Button";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const MyInfoPage = () => {
  const profileId = useSelector(selectUser).profileId;
  const { data: profile, isLoading, isError } = useGetProfileQuery(profileId!);

  const router = useRouter();

  if (isLoading) {
    if (profileId === null) {
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

  return <MenteeProfile profileId={profileId!} />;
};

export default MyInfoPage;

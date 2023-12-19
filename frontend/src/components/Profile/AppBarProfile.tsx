"use client";

import { PROFILE_MENU } from "@/constants";
import FlexBox from "@/ui/atoms/FlexBox";

import Alarm from "@icons/common/alarm.svg";
import Profile from "@icons/common/profile.svg";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import theme from "@/ui/theme";
import { useEffect, useState } from "react";
import Dropdown from "@/ui/atoms/Dropdown";
import Button from "@/ui/atoms/Button";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { backgroundImage } from "@/ui/atoms/BackgroundImage";
import { signOut } from "@/api/signApi";

const AppBarProfile = () => {
  const [selected, setSelected] = useState();
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (selected) {
      if (selected === "로그아웃") {
        signOut();
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        router.push(
          PROFILE_MENU(user.isProfile!).find((menu) => menu.name === selected)!
            .href!
        );
      }
    }
    return () => setSelected(undefined);
  }, [selected]);

  const goToApply = () => {
    if (!user?.isProfile)
      alert(
        "아직 프로필이 작성되어있지 않습니다. 프로필 작성 페이지로 이동하시겠습니까?"
      );
    router.push("/mentorRegisterForm");
  };
  return (
    <FlexBox justifyContent="flex-end" columnGap="30px">
      <Alarm />
      <Dropdown
        id="profile-menu"
        type="menu"
        categories={PROFILE_MENU(user.isProfile !== false).map(
          ({ name }) => name
        )}
        selectedCategory={selected!}
        setSelectedCategory={setSelected}
        left
      >
        {user.profileImageUrl ? (
          <StyledAppBarProfile id="profile-menu" src={user.profileImageUrl!} />
        ) : (
          <StyledAppBarProfile>
            <Profile id="profile-menu" fill={theme.colors.white} />
          </StyledAppBarProfile>
        )}
      </Dropdown>
      {!user.isMentor && (
        <Button
          size="small"
          variant="default"
          color={theme.colors.primary}
          {...{ height: "39px" }}
          onClick={() => goToApply()}
        >
          멘토 신청
        </Button>
      )}
    </FlexBox>
  );
};

const StyledAppBarProfile = styled.div(({ src }: { src?: string }) => ({
  ...backgroundImage(src!),
  width: "42px",
  height: "42px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: `${theme.colors.gray.light}`,
  borderRadius: "100%",
}));

export default AppBarProfile;

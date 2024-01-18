"use client";

import FlexBox from "@/ui/atoms/FlexBox";
import theme, { device } from "@/ui/theme";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Mentor } from "@/types/profile";
import MentorProfileInformation from "./MentorProfileInformation";

const MentorProfile = ({
  mentor,
  children,
}: {
  mentor?: Mentor;
  children?: ReactNode;
}) => {
  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="flex-start"
      columnGap="20px"
      rowGap="20px"
      {...{
        [device("tablet")]: {
          flexDirection: "column",
        },
      }}
    >
      {children}

      <MentorProfileInformation mentor={mentor!} />
    </FlexBox>
  );
};
const Divider = styled.div`
  width: 4px;
  height: 130px;
  border-radius: 4px;
  background: ${theme.colors.background};
`;

export default MentorProfile;

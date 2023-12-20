"use client";

import Button from "@/ui/atoms/Button";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import FilledLike from "@icons/common/filled-like.svg";
import EmptyLike from "@icons/common/empty-like.svg";
import Edit from "@icons/common/edit.svg";
import { likeMentor, unLikeMentor } from "@/api/mentorApi";
import { useEffect, useState } from "react";
import Link from "next/link";

const Header = ({
  edit,
  mentorId,
  favorites,
  applicationDate,
  isMyPage,
}: {
  edit?: boolean;
  mentorId?: number;
  favorites?: number[];
  applicationDate?: string;
  isMyPage?: boolean;
}) => {
  const [localFavoriteState, setLocalFavoriteState] = useState(false);
  const toggleLikeMentor = async () => {
    if (localFavoriteState) {
      await unLikeMentor(mentorId!);
    } else {
      await likeMentor(mentorId!);
    }
    setLocalFavoriteState((prev) => !prev);
  };

  useEffect(() => {
    setLocalFavoriteState(favorites?.includes(mentorId!)!);
  }, [favorites]);
  return (
    <FlexBox justifyContent="space-between" {...{ position: "relative" }}>
      {applicationDate && (
        <Chip>
          <Typography variant="span" size="sm">
            {applicationDate!}
          </Typography>
        </Chip>
      )}
      {edit && (
        <Link href={"/profileForm?edit=true"}>
          <Button variant="round" width="48px" color={theme.colors.info}>
            <Edit />
          </Button>
        </Link>
      )}
      {!isMyPage && (
        <Button
          onClick={toggleLikeMentor}
          variant="round"
          width="48px"
          color={localFavoriteState ? theme.colors.info : theme.colors.white}
          {...{ position: "absolute", top: "0px", right: "0px" }}
        >
          {localFavoriteState ? <FilledLike /> : <EmptyLike />}
        </Button>
      )}
    </FlexBox>
  );
};

export default Header;

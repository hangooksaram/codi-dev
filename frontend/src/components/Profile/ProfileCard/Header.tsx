"use cient";

import Button from "@/ui/atoms/Button";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import FilledLike from "@icons/common/filled-like.svg";
import EmptyLike from "@icons/common/empty-like.svg";
import Edit from "@icons/common/edit.svg";
import { useSelector } from "react-redux";
import { selectUser, setUser } from "@/features/user/userSlice";
import { likeMentor, unLikeMentor } from "@/api/mentorApi";
import { setLocalUser } from "@/utils/tempUser";
import { useEffect, useState } from "react";

const Header = ({
  edit,
  mentor,
  mentorId,
  favorites,
  applicationDate,
}: {
  edit?: boolean;
  mentor?: boolean;
  mentorId?: number;
  favorites?: number[];
  applicationDate?: string;
}) => {
  const user = useSelector(selectUser);
  const [localFavorites, setLocalFavorites] = useState<number[]>([]);
  const toggleLikeMentor = async () => {
    if (localFavorites?.includes(mentorId!) === true) {
      const { status } = await unLikeMentor(user?.profileId!, mentorId!);
      if (status === 200)
        setLocalFavorites((prev) =>
          prev.filter((favorite) => favorite !== mentorId)
        );
    } else {
      const { status } = await likeMentor(user?.profileId!, mentorId!);
      if (status === 200) {
        setLocalFavorites((prev) => prev.concat(mentorId!));
      }
    }
  };

  useEffect(() => {
    setLocalFavorites(favorites!);
  }, [favorites]);
  return (
    <FlexBox justifyContent="space-between">
      {applicationDate && (
        <Chip>
          <Typography variant="span" size="sm">
            {applicationDate!}
          </Typography>
        </Chip>
      )}
      {(edit && (
        <Button variant="round" width="48px" color={theme.colors.info}>
          <Edit />
        </Button>
      )) ||
        (favorites && (
          <Button
            onClick={toggleLikeMentor}
            variant="round"
            width="48px"
            color={
              localFavorites?.includes(mentorId!)
                ? theme.colors.info
                : theme.colors.white
            }
          >
            {localFavorites?.includes(mentorId!) ? (
              <FilledLike />
            ) : (
              <EmptyLike />
            )}
          </Button>
        ))}
    </FlexBox>
  );
};

export default Header;

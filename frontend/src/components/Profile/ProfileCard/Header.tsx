import Button from "@/ui/atoms/Button";
import Chip from "@/ui/atoms/Chip";
import FlexBox from "@/ui/atoms/FlexBox";
import Typography from "@/ui/atoms/Typography";
import theme from "@/ui/theme";
import FilledLike from "@icons/common/filled-like.svg";
import EmptyLike from "@icons/common/empty-like.svg";
import Edit from "@icons/common/edit.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import { likeMentor as postLikeMentor, unLikeMentor } from "@/api/mentorApi";

const Header = ({
  edit,
  mentor,
  apply,
  mentorId,
}: {
  edit?: boolean;
  mentor?: boolean;
  apply?: boolean;
  mentorId?: number;
}) => {
  const today = false;
  const [liked, setLiked] = useState(false);
  const { profileId } = useSelector(selectUser);
  const toggleLikeMentor = async () => {
    if (liked === true) await unLikeMentor(profileId!, mentorId!);
    else {
      await postLikeMentor(profileId!, mentorId!);
    }
    setLiked((prev) => !prev);
  };
  return (
    <FlexBox justifyContent="space-between">
      <div>
        {today && (
          <Chip>
            <Typography variant="span" size="sm">
              6/24 (금) 오후 12:00
            </Typography>
          </Chip>
        )}
      </div>

      {!apply &&
        (edit || mentor ? (
          <Button variant="round" width="48px" color={theme.colors.info}>
            <Edit />
          </Button>
        ) : (
          <Button
            onClick={toggleLikeMentor}
            variant="round"
            width="48px"
            color={liked ? theme.colors.info : theme.colors.white}
          >
            {liked ? <FilledLike /> : <EmptyLike />}
          </Button>
        ))}
    </FlexBox>
  );
};

export default Header;

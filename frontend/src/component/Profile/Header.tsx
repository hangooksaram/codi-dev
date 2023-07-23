import Button from "@/ui/atoms/Button/Button";
import Chip from "@/ui/atoms/Chip/Chip";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import Typography from "@/ui/atoms/Typography/Typography";
import theme from "@/ui/theme";
import FilledLike from "../../../public/icons/filled-like.svg";
import EmptyLike from "../../../public/icons/empty-like.svg";
import Edit from "../../../public/icons/edit.svg";
import { useState } from "react";

const Header = ({ edit }: { edit?: boolean }) => {
  const today = false;
  const [liked, setLiked] = useState(false);
  const likeMentor = () => {
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

      {edit ? (
        <Button variant="round" width="48px">
          <Edit />
        </Button>
      ) : (
        <Button
          onClick={likeMentor}
          variant="round"
          width="48px"
          color={liked ? theme.colors.info : theme.colors.white}
        >
          {liked ? <FilledLike /> : <EmptyLike />}
        </Button>
      )}
    </FlexBox>
  );
};

export default Header;

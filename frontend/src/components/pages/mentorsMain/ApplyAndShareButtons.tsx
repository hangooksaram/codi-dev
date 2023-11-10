import { HOMEPAGE_URL } from "@/constants";
import { selectUser } from "@/features/user/userSlice";
import FlexBox from "@/ui/atoms/FlexBox";
import { StyledImage } from "@/ui/atoms/StyledImage";
import { copyTextToClipBoard } from "@/utils/clipboard";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ApplyAndShareButtons = () => {
  const { mentorId, id } = useSelector(selectUser);
  const router = useRouter();

  return (
    <FlexBox>
      {!mentorId && (
        <StyledImage
          width="651px"
          height="251px"
          src="/images/main-mentor-apply.png"
          alt="apply-button"
          {...{ cursor: "pointer" }}
          onClick={() => router.push(id ? `/mentorApplyForm` : `/signup`)}
        />
      )}

      <StyledImage
        width="651px"
        height="251px"
        src="/images/main-mentor-recommend.png"
        alt="recommend-button"
        {...{ cursor: "pointer" }}
        onClick={() => copyTextToClipBoard(HOMEPAGE_URL, "홈페이지 주소")}
      />
    </FlexBox>
  );
};

export default ApplyAndShareButtons;

import { selectUser } from "@/features/user/userSlice";
import FlexBox from "@/ui/atoms/FlexBox";
import { StyledImage } from "@/ui/atoms/StyledImage";
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
          onClick={() => router.push(id ? "/mentorApplyForm" : `/signup7`)}
        />
      )}

      <StyledImage
        width="651px"
        height="251px"
        src="/images/main-mentor-recommend.png"
        alt="recommend-button"
        {...{ cursor: "pointer" }}
      />
    </FlexBox>
  );
};

export default ApplyAndShareButtons;

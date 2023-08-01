import styled from "@emotion/styled";
import Card from "@/ui/atoms/Card";
import FlexBox from "@/ui/atoms/FlexBox";
import Content from "./Content";
import { ProfileCard } from "@/types/mentor";
import Header from "./Header";

const ProfileCard = ({
  width,
  height,
  edit,
  mentor,
  name,
  job,
  disability,
  severity,
  isCertificate,
  imgUrl,
  star,
  mentees,
}: ProfileCard) => {
  const today = false;
  return (
    <CardContainer
      width={width}
      height={height}
      padding="10px 10px 40px 10px"
      imgUrl={imgUrl!}
    >
      <FlexBox
        direction="column"
        justifyContent="space-between"
        {...{ height: "100%" }}
      >
        <Header edit={edit} mentor={mentor} />
        <Content
          name={name}
          job={job}
          disability={disability}
          severity={severity}
          edit={edit}
          star={star}
          mentor={mentor}
          mentees={mentees}
          isCertificate={isCertificate}
        />
      </FlexBox>
    </CardContainer>
  );
};

const CardContainer = styled(Card)(({ imgUrl }: { imgUrl: string }) => ({
  background: `url(${imgUrl}) no-repeat center`,
  backgroundSize: "cover",
}));

export default ProfileCard;

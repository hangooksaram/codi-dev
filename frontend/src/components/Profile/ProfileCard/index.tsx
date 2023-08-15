import styled from "@emotion/styled";
import Card from "@/ui/atoms/Card";
import FlexBox from "@/ui/atoms/FlexBox";
import Content from "./Content";
import Header from "./Header";
import { ProfileCard } from "@/types/profile";
import { device } from "@/ui/theme";

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
  apply,
  mentorId,
  employmentStatus,
  link,
  pageQueryInfo,
  children,
}: ProfileCard) => {
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
        <Header edit={edit} mentor={mentor} apply={apply} mentorId={mentorId} />
        <Content
          name={name}
          job={job}
          disability={disability}
          severity={severity}
          edit={edit}
          star={star}
          mentor={mentor}
          apply={apply}
          mentees={mentees}
          isCertificate={isCertificate}
          mentorId={mentorId}
          employmentStatus={employmentStatus}
          link={link}
          pageQueryInfo={pageQueryInfo}
          children={children}
        />
      </FlexBox>
    </CardContainer>
  );
};

const CardContainer = styled(Card)(({ imgUrl }: { imgUrl: string }) => ({
  background: `url(${imgUrl}) no-repeat center`,
  backgroundSize: "cover",
  [device("tablet")]: {
    width: "100%",
  },
}));

export default ProfileCard;

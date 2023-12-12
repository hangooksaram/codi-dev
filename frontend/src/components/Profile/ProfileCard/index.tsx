import styled from "@emotion/styled";
import Card from "@/ui/atoms/Card";
import FlexBox from "@/ui/atoms/FlexBox";
import Content from "./Content";
import Header from "./Header";
import { ProfileCard } from "@/types/profile";
import { device } from "@/ui/theme";
import StyledImage from "@/ui/atoms/StyledImage";

const ProfileCard = ({
  width,
  height,
  edit,
  mentor,
  name,
  job,
  disability,
  severity,
  applicationDate,
  isCertificate,
  imgUrl,
  star,
  mentees,
  mentorId,
  employmentStatus,
  link,
  pageQueryInfo,
  children,
  career,
  favorites,
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
        <Header
          favorites={favorites}
          edit={edit}
          mentorId={mentorId}
          applicationDate={applicationDate}
        />
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
          mentorId={mentorId}
          career={career}
          employmentStatus={employmentStatus}
          link={link}
          pageQueryInfo={pageQueryInfo}
        >
          {children}
        </Content>
      </FlexBox>
    </CardContainer>
  );
};

const CardContainer = styled(Card)(({ imgUrl }: { imgUrl: string }) => ({
  background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 70.83%), url(${imgUrl}), lightgray -28.063px 0px / 217.894% 100% no-repeat`,
  [device("mdWeb")]: {
    backgroundPosition: "top",
  },
  [device("tablet")]: {
    width: "100%",
  },
  backgroundPosition: "center",
  backgroundSize: "cover",

  // border: "none",
}));

export default ProfileCard;

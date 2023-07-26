import Button from "@/ui/atoms/Button/Button";
import Chip from "@/ui/atoms/Chip/Chip";
import FlexBox from "@/ui/atoms/Layout/FlexBox";
import Typography from "@/ui/atoms/Typography/Typography";
import theme from "@/ui/theme";
import Certificate from "@icons/common/is-certificate.svg";
import styled from "@emotion/styled";
import Star from "@icons/common/favorite.svg";
import { MentorProfileCard } from "@/types/mentor";

const CardContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = ({
  edit,
  name,
  job,
  disability,
  severity,
  star,
  mentees,
  isCertificate,
}: MentorProfileCard) => {
  return (
    <CardContent>
      {isCertificate && <Certificate />}
      <Typography
        variant="div"
        size={theme.fonts.size.lg}
        color={theme.colors.white}
        {...{ marginBottom: "4px" }}
      >
        {name!}
      </Typography>
      <Typography
        variant="div"
        size={theme.fonts.size.xs}
        color={theme.colors.white}
        {...{ marginBottom: "16px" }}
      >
        {job!}
      </Typography>
      {!edit && (
        <FlexBox {...{ marginBottom: "20px" }}>
          <Star />
          <Typography
            variant="span"
            size={theme.fonts.size.sm}
            color={theme.colors.white}
            {...{ margin: "0px 10px 0px 5px" }}
          >
            {`(${star!.toString()}/5)`}
          </Typography>

          <Typography
            variant="span"
            size={theme.fonts.size.sm}
            color={theme.colors.white}
          >
            {`(${mentees!.toString()}명의 멘티)`}
          </Typography>
        </FlexBox>
      )}

      <FlexBox
        isWrap
        rowGap="5px"
        columnGap="5px"
        {...{ marginBottom: "20px" }}
      >
        <Chip color="yellow">{disability!}</Chip>
        <Chip>{severity}</Chip>
      </FlexBox>
      {edit ? (
        <Button size="small" variant="default">
          개인정보 수정하기
        </Button>
      ) : (
        <Button size="small" variant="default" color={theme.colors.secondary}>
          멘토링 시작하기
        </Button>
      )}
    </CardContent>
  );
};

export default Content;

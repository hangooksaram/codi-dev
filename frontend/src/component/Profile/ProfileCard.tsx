import Button from "@/ui/atoms/Button/Button";
import theme from "@/ui/theme";
import styled from "@emotion/styled";
import Star from "../../../public/icons/favorite.svg";
import Like from "../../../public/icons/filled-like.svg";
import Edit from "../../../public/icons/edit.svg";
import Card from "@/ui/atoms/Card/Card";
import Chip from "@/ui/atoms/Chip/Chip";
import Typography from "@/ui/atoms/Typography/Typography";
import FlexBox from "@/ui/atoms/Layout/FlexBox";

const CardContainer = styled(Card)(({ src }: { src: string }) => ({
  backgroundImage: `url(${src})`,
  backgroundSize: "cover",
}));

// const CardHeader = styled()(() => ({}));
const CardContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = ({ edit }: { edit?: boolean }) => {
  return (
    <CardContent>
      <Typography
        variant="div"
        size={theme.fonts.size.lg}
        color={theme.colors.white}
        {...{ marginBottom: "4px" }}
      >
        윤지영
      </Typography>
      <Typography
        variant="div"
        size={theme.fonts.size.xs}
        color={theme.colors.white}
        {...{ marginBottom: "16px" }}
      >
        마라토너
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
            5.0/5
          </Typography>

          <Typography
            variant="span"
            size={theme.fonts.size.sm}
            color={theme.colors.white}
          >
            (33명의 멘티)
          </Typography>
        </FlexBox>
      )}

      <FlexBox
        wrap={true}
        rowGap="5px"
        columnGap="5px"
        {...{ marginBottom: "20px" }}
      >
        <Chip color="yellow">장애</Chip>
        <Chip>장애</Chip>
        <Chip>장애</Chip>
        <Chip>장애</Chip>
        <Chip>장애</Chip>
        <Chip>장애</Chip>
        <Chip>장애</Chip>
      </FlexBox>
      {edit ? (
        <Button size="small" variant="default">
          개인정보 수정하기
        </Button>
      ) : (
        <Button size="small" variant="default">
          멘토링 시작하기
        </Button>
      )}
    </CardContent>
  );
};

const ProfileCard = ({
  width,
  height,
  src,
  edit,
}: {
  width: string;
  height: string;
  src: string;
  edit?: boolean;
}) => {
  return (
    <CardContainer width={width} height={height} padding="10px" src={src}>
      <FlexBox
        direction="column"
        justifyContent="space-between"
        {...{ height: "100%" }}
      >
        <FlexBox justifyContent="space-between" {...{ width: "100%" }}>
          <Chip>
            <Typography variant="span" size="sm">
              6/24 (금) 오후 12:00
            </Typography>
          </Chip>
          {edit ? (
            <Button variant="round" width="48px">
              <Edit />
            </Button>
          ) : (
            <Button variant="round" width="48px">
              <Like />
            </Button>
          )}
        </FlexBox>
        <Content edit={edit} />
      </FlexBox>
    </CardContainer>
  );
};
export default ProfileCard;
